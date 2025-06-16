using System.ComponentModel.DataAnnotations;

namespace Vis.Model
{
    public class ClaimPayment
    {
        [Key]
        public int ClaimPaymentId { get; set; }

        [Required]
        public int ClaimRequestId { get; set; }
        public ClaimRequest? ClaimRequest { get; set; }

        [Required]
        public decimal ApprovedAmount { get; set; }

        public DateTime PaymentDate { get; set; } = DateTime.Now;

        public string Status { get; set; } = "Transaction pending";
    }
}
