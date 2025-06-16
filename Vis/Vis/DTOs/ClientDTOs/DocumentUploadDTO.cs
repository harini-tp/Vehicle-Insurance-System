using System.ComponentModel.DataAnnotations;

namespace Vis.DTOs.ClientDTOs
{
    public class DocumentUploadDTO
    {
        [Required]
        public int ProposalId { get; set; }

        [Required]
        public IFormFile File { get; set; }
    }
}
