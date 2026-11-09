using System.ComponentModel.DataAnnotations;

namespace taskmateAPI.Models
{
    public class TaskMate
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
}
