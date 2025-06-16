using System.ComponentModel.DataAnnotations;

namespace Vis.DTOs
{
    public class UserRegisterDTO
    {
        [Required, StringLength(100)]
        public string FullName { get; set; }

        [Required, StringLength(250)]
        public string Address { get; set; }

        [Required]
        public DateOnly DateOfBirth { get; set; }

        [Required, StringLength(12)]
        public string AadhaarNumber { get; set; }

        [Required, StringLength(10)]
        public string PANNumber { get; set; }

        [Required, StringLength(10)]
        public string PhoneNumber { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, StringLength(20, MinimumLength = 8)]
        public string Password { get; set; }
    }
}
