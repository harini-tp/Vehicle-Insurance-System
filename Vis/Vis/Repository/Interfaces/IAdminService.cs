using Vis.Model;

namespace Vis.Repository.Interfaces
{
    public interface IAdminService
    {
        IEnumerable<LogEntry> ViewLog();
    }
}
