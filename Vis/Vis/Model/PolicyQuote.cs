using System.ComponentModel.DataAnnotations;

namespace Vis.Model
{
    public class PolicyQuote
    {
        [Key]
        public int QuoteId { get; set; }

        [Required]
        public int ProposalId { get; set; }
        public PolicyProposal? Proposal { get; set; }

        [Required]
        public decimal BasePremiumAmount { get; set; }

        [Required]
        public decimal AddOnPremiumAmount { get; set; }

        [Required]
        public decimal TotalPremium { get; set; }

        public DateTime QuoteDate { get; set; } = DateTime.Now;
        public DateTime ExpiryDate { get; set; } = DateTime.Now.AddMonths(1);

    }
}
