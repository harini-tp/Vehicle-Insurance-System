using System.ComponentModel.DataAnnotations;

namespace Vis.DTOs.ClientDTOs
{
    public class PolicyPaymentDTO
    {
        [Required]
        public decimal PaymentAmount { get; set; }
    }
}
