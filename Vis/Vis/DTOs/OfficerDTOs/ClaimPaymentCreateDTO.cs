using System.ComponentModel.DataAnnotations;

namespace Vis.DTOs.OfficerDTOs
{
    public class ClaimPaymentCreateDTO
    {
        [Required]
        public decimal ApprovedAmount { get; set; }

    }

}
