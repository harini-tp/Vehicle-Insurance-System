using Vis.Data;
using Vis.Model;
using Vis.Repository.Interfaces;

namespace Vis.Repository.Implementations
{
    public class DislayServicesImpl : IDisplayService
    {
        private readonly VisDbContext _context;
        public DislayServicesImpl(VisDbContext context)
        {
            _context = context;
        }

        public IEnumerable<BasePremium> ViewBasePremiumPlans()
        {
            var plans = _context.BasePremiums.ToList();
            return plans;
        }

        public IEnumerable<AddOn> ViewAddOns()
        {
            var addOns = _context.AddOns.ToList();
            return addOns;
        }
    }
}
