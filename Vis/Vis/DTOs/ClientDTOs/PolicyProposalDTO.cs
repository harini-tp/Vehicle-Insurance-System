using System.ComponentModel.DataAnnotations;

namespace Vis.DTOs.ClientDTOs
{
    public class PolicyProposalDTO
    {
        [Required]
        public int VehicleId { get; set; }

        [Required]
        public int BasePremiumId { get; set; }
    }
}
