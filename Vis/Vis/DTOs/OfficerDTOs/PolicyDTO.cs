namespace Vis.DTOs.OfficerDTOs
{
    public class PolicyDTO
    {
        public string PolicyNumber { get; set; }
        public DateTime ActivationDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Status { get; set; }

        public string VehicleNumber { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }

        public string CoverageType { get; set; }
        public decimal CoverageAmount { get; set; }
        public decimal BasePremiumAmount { get; set; }
    }
}
