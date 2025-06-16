using System.ComponentModel.DataAnnotations;

namespace Vis.DTOs.OfficerDTOs
{
    public class AddOnCreateDTO
    {
        [Required, StringLength(50)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        public decimal PremiumAmount { get; set; }
    }
}
