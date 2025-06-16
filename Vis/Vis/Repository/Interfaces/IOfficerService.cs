using Microsoft.AspNetCore.Mvc;
using Vis.DTOs;
using Vis.DTOs.OfficerDTOs;
using Vis.Helper;
using Vis.Model;

namespace Vis.Repository.Interfaces
{
    public interface IOfficerService
    {
        void RegisterOfficer(UserRegisterDTO dto);
        
        void CreateBasePremium(BasePremiumCreateDTO dto);
        
        void CreateAddOn(AddOnCreateDTO dto);
        
        void CreateClaimPayment(int claimRequestId, ClaimPaymentCreateDTO dto);
        
        IEnumerable<PolicyProposal> ViewPolicyProposals(int? vehicleId, int? basePremiumId, string? status);
        
        void EditProposalStatus(int proposalId,  ProposalStatus status, int? addonId);

        IEnumerable<Payment> ViewPayments(int? quoteId, string? paymentStatus);
        
        IEnumerable<PolicyDTO> ViewPolicies(int? proposalId, string? status);
        
        IEnumerable<ClaimRequest> ViewClaimRequests(int? policyId, string? claimStatus);
        
        void EditClaimRequestStatus(int claimRequestId, ClaimStatus status);

        IEnumerable<ClaimPayment> ViewClaimPayments(int? claimRequestId, string? status);

        void EditClaimPaymentStatus(int claimPaymentId, ClaimPaymentStatus status);

        IEnumerable<Document> ViewDocuments();

        FileContentResult GetDocument(int documentId);

    }
}
