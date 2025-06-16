using System.ComponentModel.DataAnnotations;

namespace Vis.Model
{
    public class BasePremium
    {
        [Key]
        public int BasePremiumId { get; set; }

        [Required, StringLength(100)]
        public string VehicleType { get; set; }

        [Required, StringLength(100)]
        public string CoverageType { get; set; }

        [Required]
        public decimal CoverageAmount { get; set; }

        [Required]
        public decimal BasePremiumAmount { get; set; }
    }
}
