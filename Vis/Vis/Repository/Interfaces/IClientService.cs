using Microsoft.AspNetCore.Mvc;
using Vis.DTOs;
using Vis.DTOs.ClientDTOs;
using Vis.Model;

namespace Vis.Repository.Interfaces
{
    public interface IClientService
    {
        void RegisterClient(UserRegisterDTO dto);

        void RegisterVehicle(int userId, VehicleRegisterDTO dto);

        IEnumerable<Vehicle> ViewMyVehicles(int userId);

        void ProposeAPolicy(int userId, PolicyProposalDTO dto); 

        IEnumerable<PolicyProposal> CheckProposalStatus(int userId);

        IEnumerable<PolicyQuoteDTO> ViewMyQuotes(int userId);

        IEnumerable<MyPolicyDTO> ViewMyPolicy(int userId);

        IEnumerable<UnpaidProposalDTO> GetUnpaidProposals(int userId);

        void MakePayment(int policyProposalId, PolicyPaymentDTO dto);

        IEnumerable<MyPaymentDTO> ViewMyPayments(int userId);

        void RequestAClaim(int policyId, ClaimRequestDTO claimDTO);

        IEnumerable<ClaimRequest> CheckClaimStatus(int userId);

        IEnumerable<ClaimPayment> CheckClaimPaymentStatus(int userId);

        void EditUserDetails(int userId, UserEditDTO dto);

        void EditVehicleDetails(int vehicleId, VehicleEditDTO dto);

        void UploadDocument(int proposalId, IFormFile file);

        FileContentResult DownloadPolicyQuoteSummary(int proposalId);

    }
}
