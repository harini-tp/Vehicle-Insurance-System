namespace Vis.DTOs.ClientDTOs
{
    public class MyPaymentDTO
    {
        public int PaymentId { get; set; }

        public decimal PaymentAmount { get; set; }
        public string PaymentStatus { get; set; }
        public DateTime PaymentDate { get; set; }

        public decimal BasePremiumAmount { get; set; }
        public decimal AddOnPremiumAmount { get; set; }
        public decimal TotalPremium { get; set; }

        public DateTime QuoteDate { get; set; }
        public DateTime QuoteExpiry { get; set; }

        public string VehicleNumber { get; set; }
        public string VehicleType { get; set; }
    }
}
