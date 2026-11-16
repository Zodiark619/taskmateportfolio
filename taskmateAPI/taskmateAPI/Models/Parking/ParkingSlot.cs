namespace taskmateAPI.Models.Parking
{
    public class ParkingSlot
    {
        public int Id { get; set; }

        // A, B, C
        public string Area { get; set; } = string.Empty;

        // A1, A2, B1, B2
        public string SlotNumber { get; set; } = string.Empty;

        // Available, Reserved, Occupied
        public string Status { get; set; } = "Available";

        public ICollection<ParkingOrder> ParkingOrders { get; set; }
            = new List<ParkingOrder>();
    }
}
