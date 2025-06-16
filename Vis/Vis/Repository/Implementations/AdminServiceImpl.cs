using Vis.Data;
using Vis.Repository.Interfaces;
using Vis.Model;

namespace Vis.Repository.Implementations
{
    public class AdminServiceImpl : IAdminService
    {
        private readonly VisDbContext _context;

        public AdminServiceImpl(VisDbContext context)
        {
            _context = context;
        }

        public IEnumerable<LogEntry> ViewLog()
        {
            var logs = _context.LogEntries.ToList();
            return logs;
        }
    }
}
