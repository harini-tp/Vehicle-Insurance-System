using System.ComponentModel.DataAnnotations;

namespace Vis.Model
{
    public class PolicyProposal
    {
        [Key]
        public int ProposalId { get; set; }

        [Required]
        public int VehicleId { get; set; }
        public Vehicle? Vehicle { get; set; }

        public DateTime ProposalDate { get; set; } = DateTime.Now;

        [StringLength(50)]
        public string Status { get; set; } = "Proposal Submitted";

        [Required]
        public int BasePremiumId { get; set; }
        public BasePremium? BasePremiumPlan { get; set; }

        public PolicyQuote? PolicyQuote { get; set; }
        public Policy? Policy { get; set; }

        public ICollection<PolicyAddOn>? PolicyAddOns { get; set; }
    }
}
