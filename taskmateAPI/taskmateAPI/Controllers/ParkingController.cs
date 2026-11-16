using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using taskmateAPI.Data;
using taskmateAPI.Models.Parking;

namespace taskmateAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public ParkingController(ApplicationDbContext dbContext,UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetParkingSlots([FromQuery]string? status,string? area,string? slotNumber)
        {
            var parkingSlots =   _dbContext.ParkingSlot.AsQueryable();
            if (!string.IsNullOrWhiteSpace(status))
            {
               parkingSlots= parkingSlots.Where(x => x.Status == status);
            }
            if (!string.IsNullOrWhiteSpace(area))
            {
               parkingSlots= parkingSlots.Where(x => x.Area == area);
            }
            if (!string.IsNullOrWhiteSpace(slotNumber))
            {
               parkingSlots= parkingSlots.Where(x => x.SlotNumber.Contains (slotNumber));
            }
            var result =await parkingSlots.Select(x => new ParkingSlotDTO
            {
                Id = x.Id,
                SlotNumber = x.SlotNumber,
                Area = x.Area,
                Status = x.Status,
            }).ToListAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateParkingOrder(
    [FromBody] CreateParkingOrderDTO createParkingOrderDTO)
        {
            // Validate car number
            if (string.IsNullOrWhiteSpace(createParkingOrderDTO.CarNumber))
            {
                return BadRequest("Car number is required.");
            }

            // Find parking slot
            var chosenParkingSlot = await _dbContext.ParkingSlot
                .FindAsync(createParkingOrderDTO.ParkingSlotId);

            if (chosenParkingSlot == null)
            {
                return NotFound("Parking slot not found.");
            }

            // Validate action
            if (createParkingOrderDTO.Action != "checkIn" &&
                createParkingOrderDTO.Action != "checkOut")
            {
                return BadRequest("Invalid action.");
            }

            // Validate user
            var user = await _userManager.FindByIdAsync(createParkingOrderDTO.UserId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Update parking slot status
            if (createParkingOrderDTO.Action == "checkIn")
            {
                if (chosenParkingSlot.Status != "Available")
                {
                    return BadRequest("Parking slot is not available.");
                }

                chosenParkingSlot.Status = "Occupied";
            }
            else
            {
                if (chosenParkingSlot.Status != "Occupied")
                {
                    return BadRequest("Parking slot is not occupied.");
                }

                chosenParkingSlot.Status = "Available";
            }

            // Create parking order
            var parkingOrder = new ParkingOrder
            {
                ParkingSlotId = chosenParkingSlot.Id,
                ParkingSlot = chosenParkingSlot,

                CarNumber = createParkingOrderDTO.CarNumber,
                Action = createParkingOrderDTO.Action,

                CreatedAt = DateTime.UtcNow,

                UserId = user.Id
            };

            _dbContext.ParkingOrder.Add(parkingOrder);

            await _dbContext.SaveChangesAsync();

            // Return DTO
            return Ok(new ParkingOrderDTO
            {
                Id = parkingOrder.Id,
                ParkingSlotId = parkingOrder.ParkingSlotId,
                SlotNumber = chosenParkingSlot.SlotNumber,
                CarNumber = parkingOrder.CarNumber,
                Action = parkingOrder.Action,
                CreatedAt = parkingOrder.CreatedAt,
                UserId = parkingOrder.UserId,
                Username = user.UserName ?? string.Empty
            });
        }
    }
}
