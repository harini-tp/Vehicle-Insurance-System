using System.ComponentModel.DataAnnotations;

namespace Vis.Model
{
    public class PolicyAddOn
    {
        [Key]
        public int PolicyAddOnId { get; set; }

        [Required]
        public int ProposalId { get; set; }
        public PolicyProposal? Proposal { get; set; }

        [Required]
        public int AddOnId { get; set; }
        public AddOn? AddOn { get; set; }
    }
}
