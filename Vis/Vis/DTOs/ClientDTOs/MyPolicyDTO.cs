namespace Vis.DTOs.ClientDTOs
{
    public class MyPolicyDTO
    {
        public int PolicyId { get; set; }
        public string PolicyNumber { get; set; }
        public string Status { get; set; }
        public DateTime ActivationDate { get; set; }
        public DateTime ExpiryDate { get; set; }

        public string VehicleNumber { get; set; }
        public string VehicleType { get; set; }

        public decimal BasePremiumAmount { get; set; }
        public decimal AddOnPremiumAmount { get; set; }
        public decimal TotalPremium { get; set; }

        public DateTime QuoteDate { get; set; }
        public DateTime QuoteExpiry { get; set; }
    }
}
