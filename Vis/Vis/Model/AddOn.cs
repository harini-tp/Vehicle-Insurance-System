using System.ComponentModel.DataAnnotations;

namespace Vis.Model
{
    public class AddOn
    {
        [Key]
        public int AddOnId { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        public decimal PremiumAmount { get; set; }

        public ICollection<PolicyAddOn>? PolicyAddOns { get; set; }
    }
}
