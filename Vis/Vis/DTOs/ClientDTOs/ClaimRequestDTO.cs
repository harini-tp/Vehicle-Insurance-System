using System.ComponentModel.DataAnnotations;

namespace Vis.DTOs.ClientDTOs
{
    public class ClaimRequestDTO
    {
        [Required, StringLength(500)]
        public string IncidentDescription { get; set; }

        [Required]
        public decimal ClaimAmountRequested { get; set; }
    }
}
