using System.ComponentModel.DataAnnotations;

namespace Vis.Model
{
    public class Policy
    {
        [Key]
        public int PolicyId { get; set; }

        [Required]
        public int ProposalId { get; set; }
        public PolicyProposal? Proposal { get; set; }

        [Required, StringLength(50)]
        public string PolicyNumber { get; set; }

        public DateTime ActivationDate { get; set; } = DateTime.Now;
        public DateTime ExpiryDate { get; set; } = DateTime.Now.AddYears(1);

        [Required]
        public string Status { get; set; } = "Active";
    }
}
