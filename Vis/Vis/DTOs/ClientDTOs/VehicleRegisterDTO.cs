using System.ComponentModel.DataAnnotations;

namespace Vis.DTOs.ClientDTOs
{
    public class VehicleRegisterDTO
    {
        [Required, StringLength(100)]
        public string VehicleType { get; set; }

        [Required, StringLength(50)]
        public string VehicleNumber { get; set; }

        [StringLength(50)]
        public string Make { get; set; }

        [StringLength(50)]
        public string Model { get; set; }

        [Range(2010, 2025)]
        public int YearOfManufacture { get; set; }

        [Required, StringLength(50)]
        public string ChassisNumber { get; set; }
    }
}
