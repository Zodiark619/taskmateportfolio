using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using taskmateAPI.Data;
using taskmateAPI.Models;
using taskmateAPI.Models.DTO.Auth;

namespace taskmateAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, UserManager<IdentityUser> userManager, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (!string.IsNullOrEmpty(refreshToken))
            {
                var storedToken = await _context.RefreshToken
                    .FirstOrDefaultAsync(x =>
                        x.Token == refreshToken);

                if (storedToken != null)
                {
                    storedToken.IsRevoked = true;
                    await _context.SaveChangesAsync();
                }
            }

            Response.Cookies.Delete("refreshToken", new CookieOptions
            {
                Path = "/api/Auth",
                Secure = true,
                SameSite = SameSiteMode.None
            });

            return Ok(new { Message = "Logged out successfully" });
        }
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized("Refresh token cookie is missing.");

            var storedToken = await _context.RefreshToken
                .FirstOrDefaultAsync(x => x.Token == refreshToken);

            if (storedToken == null ||
                storedToken.IsRevoked ||
                storedToken.ExpiresAt <= DateTime.UtcNow)
            {
                Response.Cookies.Delete("refreshToken", new CookieOptions
                {
                    Path = "/api/Auth",
                    Secure = true,
                    SameSite = SameSiteMode.None
                });

                return Unauthorized("Refresh token is invalid or expired.");
            }

            var user = await _userManager.FindByIdAsync(storedToken.UserId);

            if (user == null)
                return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);

            storedToken.IsRevoked = true;

            var newRefreshToken = new RefreshToken
            {
                Token = GenerateRefreshToken(),
                UserId = user.Id,
                ExpiresAt = DateTime.UtcNow.AddDays(
                    _configuration.GetValue<int>("Jwt:RefreshTokenExpirationDays")
                ),
                IsRevoked = false
            };

            _context.RefreshToken.Add(newRefreshToken);

            var newAccessToken = CreateJWTToken(user, roles.ToList());

            await _context.SaveChangesAsync();

            Response.Cookies.Append(
                "refreshToken",
                newRefreshToken.Token,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = newRefreshToken.ExpiresAt,
                    Path = "/api/Auth"
                }
            );

            return Ok(new
            {
                AccessToken = newAccessToken,
                ExpiresIn = _configuration.GetValue<int>(
                    "Jwt:AccessTokenExpirationMinutes"
                ) * 60,
                username = user.UserName
            });
        }
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerRequestDTO)
        {
            var identityUser = new IdentityUser
            {
                UserName = registerRequestDTO.Username,
                Email = registerRequestDTO.Username,

            };
            var identityResult = await _userManager.CreateAsync(identityUser, registerRequestDTO.Password);
            if (identityResult.Succeeded)
            {
                if (registerRequestDTO.Roles != null && registerRequestDTO.Roles.Any())
                {

                    identityResult = await _userManager.AddToRolesAsync(identityUser, registerRequestDTO.Roles);
                    if (identityResult.Succeeded)
                    {
                        return Ok("user registered successfullyhi");
                    }
                }
            }
            return BadRequest("something went wrong");
        }
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(
      [FromBody] LoginRequestDTO loginRequestDTO)
        {
            var user = await _userManager.FindByEmailAsync(
                loginRequestDTO.Username
            );

            if (user == null)
                return Unauthorized("Invalid email or password");

            var checkPasswordResult = await _userManager.CheckPasswordAsync(
                user,
                loginRequestDTO.Password
            );

            if (!checkPasswordResult)
                return Unauthorized("Invalid email or password");

            var roles = await _userManager.GetRolesAsync(user);

            var accessToken = CreateJWTToken(
                user,
                roles.ToList()
            );

            var refreshToken = new RefreshToken
            {
                Token = GenerateRefreshToken(),
                UserId = user.Id,
                ExpiresAt = DateTime.UtcNow.AddDays(
                    _configuration.GetValue<int>(
                        "Jwt:RefreshTokenExpirationDays"
                    )
                ),
                IsRevoked = false
            };

            _context.RefreshToken.Add(refreshToken);

            await _context.SaveChangesAsync();
            Response.Cookies.Append(
    "refreshToken",
    refreshToken.Token,
    new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None,
        Expires = refreshToken.ExpiresAt,
        Path = "/api/Auth"
    }
);
            var response = new
            {
                AccessToken = accessToken,
                //  RefreshToken = refreshToken.Token,
                ExpiresIn = _configuration.GetValue<int>(
                    "Jwt:AccessTokenExpirationMinutes"
                ) * 60,
                username = user.UserName
            };

            return Ok(response);
        }

        private string CreateJWTToken(IdentityUser user, List<string> roles)
        {

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.NameIdentifier, user.Id)
    };
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("Jwt:AccessTokenExpirationMinutes")),
                claims: claims,
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];

            using var rng = RandomNumberGenerator.Create();

            rng.GetBytes(randomNumber);

            return Convert.ToBase64String(randomNumber);
        }
    }
}
