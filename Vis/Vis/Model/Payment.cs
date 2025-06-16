using System.ComponentModel.DataAnnotations;

namespace Vis.Model
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }

        [Required]
        public int QuoteId { get; set; }
        public PolicyQuote? Quote { get; set; }

        public DateTime PaymentDate { get; set; } = DateTime.Now;

        [Required]
        public decimal PaymentAmount { get; set; }

        public string PaymentStatus { get; set; } = "Success";
    }
}
