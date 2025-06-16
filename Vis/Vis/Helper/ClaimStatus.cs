using Microsoft.AspNetCore.Http.HttpResults;

namespace Vis.Helper
{
    public enum ClaimStatus
    {
        Accepted,
        Rejected,
        MoreDocumentsRequired
    }
}
