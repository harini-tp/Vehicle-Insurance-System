using Vis.Model;

namespace Vis.Repository.Interfaces
{
    public interface IDisplayService
    {
        IEnumerable<BasePremium> ViewBasePremiumPlans();
        IEnumerable<AddOn> ViewAddOns();

    }
}
