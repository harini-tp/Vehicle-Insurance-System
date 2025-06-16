using System.ComponentModel.DataAnnotations;

namespace Vis.Model
{
    public class ClaimRequest
    {
        [Key]
        public int ClaimRequestId { get; set; }

        [Required]
        public int PolicyId { get; set; }
        public Policy? Policy { get; set; }

        public DateTime DateOfClaim { get; set; } = DateTime.Now;

        [Required, StringLength(500)]
        public string IncidentDescription { get; set; }

        public string ClaimStatus { get; set; } = "Claim Submitted";

        [Required]
        public decimal ClaimAmountRequested { get; set; }

        public ClaimPayment? ClaimPayment { get; set; }
    }
}
