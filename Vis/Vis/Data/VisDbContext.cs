using Microsoft.EntityFrameworkCore;
using Vis.Model;

namespace Vis.Data
{
    public class VisDbContext : DbContext
    {
        public VisDbContext(DbContextOptions options) : base(options)
        {
        }

        //public VisDbContext() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=RAVEN\\SQLEXPRESS;Database=VisDB;Trusted_Connection=True;TrustServerCertificate=True;");
        }

        public virtual DbSet<User> Users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<AddOn> AddOns { get; set; }
        public DbSet<BasePremium> BasePremiums { get; set; }
        public DbSet<PolicyProposal> PolicyProposals { get; set; }
        public DbSet<PolicyQuote> PolicyQuotes { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Policy> Policies { get; set; }
        public DbSet<PolicyAddOn> PolicyAddOns { get; set; }
        public DbSet<ClaimRequest> ClaimRequests { get; set; }
        public DbSet<ClaimPayment> ClaimPayments { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<LogEntry> LogEntries { get; set; }
    }
}
