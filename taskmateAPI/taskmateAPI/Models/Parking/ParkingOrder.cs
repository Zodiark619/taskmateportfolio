using Microsoft.AspNetCore.Identity;

namespace taskmateAPI.Models.Parking
{
    public class ParkingOrder
    {
        public int Id { get; set; }

        public int ParkingSlotId { get; set; }
        public ParkingSlot ParkingSlot { get; set; } = null!;

        public string CarNumber { get; set; } = string.Empty;   
        public string Action { get; set; } = string.Empty; // checkin, checkout
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public IdentityUser User { get; set; } = null!;
        public string UserId { get; set; } = string.Empty;
    }
}
