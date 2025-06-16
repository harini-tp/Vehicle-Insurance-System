using Vis.Data;
using Vis.Model;

namespace Vis.Service
{
    public class LogService
    {
        private readonly VisDbContext _context;
        public LogService(VisDbContext context)
        {
            _context = context;
        }

        public void LogError(Exception ex)
        {
            var log = new LogEntry
            {
                Message = ex.Message,
                StackTrace = ex.StackTrace,
                Timestamp = DateTime.UtcNow
            };
            _context.LogEntries.Add(log);
            _context.SaveChanges();
        }
    }
}
