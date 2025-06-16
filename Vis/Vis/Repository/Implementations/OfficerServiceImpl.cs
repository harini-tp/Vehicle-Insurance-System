using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vis.Data;
using Vis.DTOs;
using Vis.DTOs.OfficerDTOs;
using Vis.Exceptions;
using Vis.Helper;
using Vis.Model;
using Vis.Repository.Interfaces;

namespace Vis.Repository.Implementations
{
    public class OfficerServiceImpl : IOfficerService
    {
        private readonly VisDbContext _context;

        public OfficerServiceImpl(VisDbContext context)
        {
            _context = context;
        }

        public void RegisterOfficer(UserRegisterDTO dto)
        {
            var user = new User
            {
                FullName = dto.FullName,
                Address = dto.Address,
                DateOfBirth = dto.DateOfBirth,
                AadhaarNumber = dto.AadhaarNumber,
                PANNumber = dto.PANNumber,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                Password = dto.Password,
                Role = "Officer"
            };

            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void CreateBasePremium(BasePremiumCreateDTO dto)
        {
            var basePremium = new BasePremium
            {
                VehicleType = dto.VehicleType,
                CoverageType = dto.CoverageType,
                CoverageAmount = dto.CoverageAmount,
                BasePremiumAmount = dto.BasePremiumAmount
            };

            _context.BasePremiums.Add(basePremium);
            _context.SaveChanges();
        }

        public void CreateAddOn(AddOnCreateDTO dto)
        {
            var addOn = new AddOn
            {
                Name = dto.Name,
                Description = dto.Description,
                PremiumAmount = dto.PremiumAmount
            };

            _context.AddOns.Add(addOn);
            _context.SaveChanges();
        }

        
        public void CreateClaimPayment(int claimRequestId, ClaimPaymentCreateDTO dto)
        {
            var claimRequestExists = _context.ClaimRequests.Any(cr => cr.ClaimRequestId == claimRequestId);

            if (!claimRequestExists)
            {
                throw new Exception("Claim request not found.");
            }

            var payment = new ClaimPayment
            {
                ClaimRequestId = claimRequestId,
                ApprovedAmount = dto.ApprovedAmount
            };

            _context.ClaimPayments.Add(payment);
            _context.SaveChanges();
        }


        public IEnumerable<PolicyProposal> ViewPolicyProposals(int? vehicleId, int? basePremiumId, string? status)
        {
            var proposals = _context.PolicyProposals
                            .Include(p => p.Vehicle)
                            .Include(p => p.BasePremiumPlan)
                            .AsQueryable();

            if (vehicleId.HasValue)
            {
                proposals = proposals.Where(p => p.VehicleId == vehicleId.Value);
            }

            if (basePremiumId.HasValue)
            {
                proposals = proposals.Where(p => p.BasePremiumId == basePremiumId.Value);
            }

            if (!string.IsNullOrWhiteSpace(status))
            {
                proposals = proposals.Where(p => EF.Functions.Like(p.Status, status));
            }

            return proposals.ToList();
        }


        public void EditProposalStatus(int proposalId, ProposalStatus status, int? addonId)
        {
            using var transaction = _context.Database.BeginTransaction();

            var proposal = _context.PolicyProposals
                                   .FirstOrDefault(p => p.ProposalId == proposalId);

            if (proposal == null)
            {
                throw new Exception("Proposal not found.");
            }

            proposal.Status = status.ToString();

            if (status == ProposalStatus.Accepted)
            {
                if (addonId == null)
                {
                    throw new AddOnForAcceptedException("AddonId is required for Accepted proposals.");
                }

                var policyAddon = new PolicyAddOn
                {
                    ProposalId = proposalId,
                    AddOnId = addonId.Value
                };
                _context.PolicyAddOns.Add(policyAddon);

                var basePremium = _context.BasePremiums
                                          .FirstOrDefault(bp => bp.BasePremiumId == proposal.BasePremiumId);

                if (basePremium == null)
                {
                    throw new Exception("Base premium linked to the proposal not found.");
                }

                var addon = _context.AddOns.FirstOrDefault(a => a.AddOnId == addonId.Value);
                if (addon == null)
                {
                    throw new Exception("Addon not found.");
                }

                decimal basePremiumAmount = basePremium.CoverageAmount + basePremium.BasePremiumAmount;
                decimal addonPremiumAmount = addon.PremiumAmount;
                decimal totalPremiumAmount = basePremiumAmount + addonPremiumAmount;

                var quote = new PolicyQuote
                {
                    ProposalId = proposalId,
                    BasePremiumAmount = basePremiumAmount,
                    AddOnPremiumAmount = addonPremiumAmount,
                    TotalPremium = totalPremiumAmount
                };

                _context.PolicyQuotes.Add(quote);
            }

            int changes = _context.SaveChanges();

            if (changes <= 0)
                throw new Exception("No changes were made to the database.");

            transaction.Commit();
        }

        public IEnumerable<Payment> ViewPayments(int? quoteId, string? paymentStatus)
        {
            var payments = _context.Payments
                            .Include(p => p.Quote)
                            .AsQueryable();

            if (quoteId.HasValue)
            {
                payments = payments.Where(p => p.QuoteId == quoteId.Value);
            }

            if (!string.IsNullOrWhiteSpace(paymentStatus))
            {
                payments = payments.Where(p => EF.Functions.Like(p.PaymentStatus, paymentStatus));
            }

            return payments.ToList();
        }

        public IEnumerable<PolicyDTO> ViewPolicies(int? proposalId, string? status)
        {
            var policies = _context.Policies
                            .Include(p => p.Proposal)
                            .ThenInclude(pr => pr.Vehicle)
                            .Include(p => p.Proposal.BasePremiumPlan)
                            .AsQueryable();

            if (proposalId.HasValue)
            {
                policies = policies.Where(p => p.ProposalId == proposalId.Value);
            }

            if (!string.IsNullOrWhiteSpace(status))
            {
                policies = policies.Where(p => EF.Functions.Like(p.Status, status));
            }

            return policies.Select(p => new PolicyDTO
            {
                PolicyNumber = p.PolicyNumber,
                ActivationDate = p.ActivationDate,
                ExpiryDate = p.ExpiryDate,
                Status = p.Status,
                VehicleNumber = p.Proposal.Vehicle.VehicleNumber,
                Make = p.Proposal.Vehicle.Make,
                Model = p.Proposal.Vehicle.Model,
                CoverageType = p.Proposal.BasePremiumPlan.CoverageType,
                CoverageAmount = p.Proposal.BasePremiumPlan.CoverageAmount,
                BasePremiumAmount = p.Proposal.BasePremiumPlan.BasePremiumAmount
            }).ToList();
        }

        public IEnumerable<ClaimRequest> ViewClaimRequests(int? policyId, string? claimStatus)
        {
            var claims = _context.ClaimRequests
                         .Include(cr => cr.Policy)
                         .AsQueryable();

            if (policyId.HasValue)
            {
                claims = claims.Where(cr => cr.PolicyId == policyId.Value);
            }

            if (!string.IsNullOrWhiteSpace(claimStatus))
            {
                claims = claims.Where(cr => EF.Functions.Like(cr.ClaimStatus, claimStatus));
            }

            return claims.ToList();
        }

        public void EditClaimRequestStatus(int claimRequestId, ClaimStatus status)
        {
            using var transaction = _context.Database.BeginTransaction();

            var claimRequest = _context.ClaimRequests
                                        .FirstOrDefault(cr => cr.ClaimRequestId == claimRequestId);

            if (claimRequest == null)
            {
                throw new Exception("ClaimRequest not found.");
            }

            claimRequest.ClaimStatus = status.ToString();

            if (status == ClaimStatus.Accepted)
            {
                var payment = new ClaimPayment
                {
                    ClaimRequestId = claimRequestId,
                    ApprovedAmount = claimRequest.ClaimAmountRequested
                };

                _context.ClaimPayments.Add(payment);
            }

            _context.SaveChanges();
            transaction.Commit();
        }

        public IEnumerable<ClaimPayment> ViewClaimPayments(int? claimRequestId, string? status)
        {
            var claimPayments = _context.ClaimPayments.AsQueryable();

            if (claimRequestId.HasValue)
            {
                claimPayments = claimPayments.Where(cp => cp.ClaimRequestId == claimRequestId.Value);
            }

            if (!string.IsNullOrWhiteSpace(status))
            {
                claimPayments = claimPayments.Where(cp => EF.Functions.Like(cp.Status, status));
            }

            return claimPayments.ToList();
        }

        public void EditClaimPaymentStatus(int claimPaymentId, ClaimPaymentStatus status)
        {
            var claimpayment = _context.ClaimPayments
                                        .FirstOrDefault(cp => cp.ClaimPaymentId == claimPaymentId);

            if (claimpayment == null)
            {
                throw new Exception("ClaimPayment not found.");
            }

            claimpayment.Status = status.ToString();

            _context.SaveChanges();
        }

        public IEnumerable<Document> ViewDocuments()
        {
            var doc = _context.Documents
                        .Include(d => d.Proposal)
                        .ToList();
            return doc;
        }

        public FileContentResult GetDocument(int documentId)
        {
            var document = _context.Documents.FirstOrDefault(d => d.DocumentId == documentId);

            if (document == null)
            {
                throw new Exception("Document not found.");
            }

            var absolutePath = Path.Combine("wwwroot", document.FilePath);

            if (!System.IO.File.Exists(absolutePath))
            {
                throw new Exception("Stored file not found on disk.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(absolutePath);

            return new FileContentResult(fileBytes, document.FileType)
            {
                FileDownloadName = document.FileName
            };
        }

    }
}
