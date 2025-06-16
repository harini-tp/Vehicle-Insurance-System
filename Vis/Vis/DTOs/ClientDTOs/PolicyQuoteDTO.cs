namespace Vis.DTOs.ClientDTOs
{
    public class PolicyQuoteDTO
    {
        public int QuoteId { get; set; }
        public decimal BasePremiumAmount { get; set; }
        public decimal AddOnPremiumAmount { get; set; }
        public decimal TotalPremium { get; set; }
        public DateTime QuoteDate { get; set; }
        public DateTime ExpiryDate { get; set; }

        public string VehicleNumber { get; set; }
        public string VehicleType { get; set; }
    }
}
