using Microsoft.AspNetCore.Identity;

namespace taskmateAPI.Models.Parking
{
    public class ParkingOrderDTO
    {
        public int Id { get; set; }

        public int ParkingSlotId { get; set; } 
        public string  SlotNumber { get; set; } = string.Empty;

        public string CarNumber { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty; // checkin, checkout

        public DateTime CreatedAt { get; set; } 
      
        public string UserId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
    }
    public class CreateParkingOrderDTO
    {

        public int ParkingSlotId { get; set; }

        public string CarNumber { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty; // checkin, checkout

          public string UserId { get; set; } = string.Empty;
    }
}
