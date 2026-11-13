using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using taskmateAPI.Data;
using taskmateAPI.Models.DTO.Product;

namespace taskmateAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ProductController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _dbContext.Product.Select(x=>new ProductResponseDTO
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                ImageUrl = x.ImageUrl
            }).ToList();
            return Ok(products);
        }
    }
}
