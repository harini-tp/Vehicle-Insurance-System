using System.ComponentModel.DataAnnotations;

namespace Vis.Model
{
    public class Document
    {
        [Key]
        public int DocumentId { get; set; }

        public int ProposalId { get; set; }
        public PolicyProposal? Proposal { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public string FileType { get; set; }

        public DateTime UploadedDate { get; set; } = DateTime.Now;

        [Required]
        public string FilePath { get; set; }
    }
}
