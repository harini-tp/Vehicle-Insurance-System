using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vis.Data;
using Vis.DTOs;
using Vis.DTOs.ClientDTOs;
using Vis.Exceptions;
using Vis.Model;
using Vis.Repository.Interfaces;

namespace Vis.Repository.Implementations
{
    public class ClientServiceImpl : IClientService
    {
        private readonly VisDbContext _context;

        public ClientServiceImpl(VisDbContext context)
        {
            _context= context;
        }

        public void RegisterClient(UserRegisterDTO dto)
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
                Role = "Client" 
            };

            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void RegisterVehicle(int userId, VehicleRegisterDTO dto)
        {
            var vehicle = new Vehicle
            {
                UserId = userId,  
                VehicleType = dto.VehicleType,
                VehicleNumber = dto.VehicleNumber,
                Make = dto.Make,
                Model = dto.Model,
                YearOfManufacture = dto.YearOfManufacture,
                ChassisNumber = dto.ChassisNumber
            };

            _context.Vehicles.Add(vehicle);
            _context.SaveChanges();
        }

        public IEnumerable<Vehicle> ViewMyVehicles(int userId)
        {
            var filteredData = _context.Vehicles
                               .Where(v => v.UserId == userId)
                               .ToList();

            return filteredData;
        }

        public void ProposeAPolicy(int userId, PolicyProposalDTO dto)
        {
            var vehicle = _context.Vehicles.FirstOrDefault(v => v.VehicleId == dto.VehicleId);
            if (vehicle == null)
            {
                throw new Exception("Vehicle not found.");
            }

            if (vehicle.UserId != userId)
            {
                throw new UnauthorizedVehicleAccessException("You are not authorized to propose a policy for this vehicle.");
            }

            var policyProposal = new PolicyProposal
            {
                VehicleId = dto.VehicleId,
                BasePremiumId = dto.BasePremiumId
            };

            _context.PolicyProposals.Add(policyProposal);
            _context.SaveChanges();
        }

        public IEnumerable<PolicyProposal> CheckProposalStatus(int userId)
        {
            /*
            var proposals = _context.PolicyProposals
                            .Where(p => p.Vehicle.UserId == userId)
                            .ToList();
            */
            
            var proposals = _context.PolicyProposals
                            .Include(p => p.Vehicle)
                            .Include(p => p.BasePremiumPlan)
                            .Where(p => p.Vehicle.UserId == userId)
                            .ToList();
        
            return proposals;
        }

        public IEnumerable<MyPolicyDTO> ViewMyPolicy(int userId)
        {
            /*
            var policy = _context.Policies 
                         .Where(p => p.Proposal.Vehicle.UserId == userId)
                         .ToList(); 
            */
            var policies = _context.Policies
                            .Include(p => p.Proposal)
                                .ThenInclude(pr => pr.Vehicle)
                            .Include(p => p.Proposal)
                                .ThenInclude(pr => pr.PolicyQuote)
                            .Where(p => p.Proposal.Vehicle.UserId == userId)
                            .Select(p => new MyPolicyDTO
                            {
                                PolicyId = p.PolicyId,
                                PolicyNumber = p.PolicyNumber,
                                Status = p.Status,
                                ActivationDate = p.ActivationDate,
                                ExpiryDate = p.ExpiryDate,

                                VehicleNumber = p.Proposal.Vehicle.VehicleNumber,
                                VehicleType = p.Proposal.Vehicle.VehicleType,

                                BasePremiumAmount = p.Proposal.PolicyQuote.BasePremiumAmount,
                                AddOnPremiumAmount = p.Proposal.PolicyQuote.AddOnPremiumAmount,
                                TotalPremium = p.Proposal.PolicyQuote.TotalPremium,

                                QuoteDate = p.Proposal.PolicyQuote.QuoteDate,
                                QuoteExpiry = p.Proposal.PolicyQuote.ExpiryDate
                            })
                            .ToList();

            return policies;
        }

        public IEnumerable<PolicyQuoteDTO> ViewMyQuotes(int userId)
        {
            /*
            var quotes = _context.PolicyQuotes
                         .Where(q => q.Proposal.Vehicle.UserId == userId)
                         .ToList();
            */
            var quotes = _context.PolicyQuotes
                        .Include(q => q.Proposal)
                            .ThenInclude(p => p.Vehicle)
                        .Where(q => q.Proposal.Vehicle.UserId == userId)
                        .Select(q => new PolicyQuoteDTO
                        {
                            QuoteId = q.QuoteId,
                            BasePremiumAmount = q.BasePremiumAmount,
                            AddOnPremiumAmount = q.AddOnPremiumAmount,
                            TotalPremium = q.TotalPremium,
                            QuoteDate = q.QuoteDate,
                            ExpiryDate = q.ExpiryDate,
                            VehicleNumber = q.Proposal.Vehicle.VehicleNumber,
                            VehicleType = q.Proposal.Vehicle.VehicleType
                        })
                        .ToList();

            return quotes;
        }

        public IEnumerable<UnpaidProposalDTO> GetUnpaidProposals(int userId)
        {
            var proposals = _context.PolicyProposals
                .Include(p => p.Vehicle)
                .Include(p => p.PolicyQuote)
                .Include(p => p.Policy)
                .Where(p => p.Vehicle.UserId == userId && p.Policy == null && p.PolicyQuote != null)
                .Select(p => new UnpaidProposalDTO
                {
                    ProposalId = p.ProposalId,
                    VehicleNumber = p.Vehicle.VehicleNumber,
                    VehicleType = p.Vehicle.VehicleType,
                    BasePremiumAmount = p.PolicyQuote.BasePremiumAmount,
                    AddOnPremiumAmount = p.PolicyQuote.AddOnPremiumAmount,
                    TotalPremium = p.PolicyQuote.TotalPremium,
                    QuoteDate = p.PolicyQuote.QuoteDate,
                    ExpiryDate = p.PolicyQuote.ExpiryDate
                })
                .ToList();

            return proposals;
        }

        public void MakePayment(int policyProposalId, PolicyPaymentDTO dto)
        {
            using var transaction = _context.Database.BeginTransaction();

            var quote = _context.PolicyQuotes.FirstOrDefault(q => q.ProposalId == policyProposalId);

            if (quote == null)
            {
                throw new QuoteNotFoundException("Quote not found for the given proposal.");
            }

            var payment = new Payment
            {
                QuoteId = quote.QuoteId,
                PaymentAmount = dto.PaymentAmount
            };
            _context.Payments.Add(payment);

            var policy = new Policy
            {
                ProposalId = policyProposalId,
                PolicyNumber = GeneratePolicyNumber()
            };
            _context.Policies.Add(policy);

            int changes = _context.SaveChanges();

            if (changes <= 0)
                throw new Exception("No changes were made to Policy Proposal and Payments the database.");

            transaction.Commit();
        }

        private string GeneratePolicyNumber()
        {
            return $"POL-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";
        }

        public IEnumerable<MyPaymentDTO> ViewMyPayments(int userId)
        {
            /*
            var payments = _context.Payments
                               .Where(v => v.Quote.Proposal.Vehicle.UserId == userId)
                               .ToList();
            */
            var payments = _context.Payments
                            .Include(p => p.Quote)
                                .ThenInclude(q => q.Proposal)
                                    .ThenInclude(prop => prop.Vehicle)
                            .Where(p => p.Quote.Proposal.Vehicle.UserId == userId)
                            .Select(p => new MyPaymentDTO
                            {
                                PaymentId = p.PaymentId,
                                PaymentAmount = p.PaymentAmount,
                                PaymentStatus = p.PaymentStatus,
                                PaymentDate = p.PaymentDate,

                                BasePremiumAmount = p.Quote.BasePremiumAmount,
                                AddOnPremiumAmount = p.Quote.AddOnPremiumAmount,
                                TotalPremium = p.Quote.TotalPremium,

                                QuoteDate = p.Quote.QuoteDate,
                                QuoteExpiry = p.Quote.ExpiryDate,

                                VehicleNumber = p.Quote.Proposal.Vehicle.VehicleNumber,
                                VehicleType = p.Quote.Proposal.Vehicle.VehicleType
                            })
                            .ToList();

            return payments;
        }

        public void RequestAClaim(int policyId, ClaimRequestDTO claimDTO)
        {
            var policy = _context.Policies.FirstOrDefault(p => p.PolicyId == policyId);
            if (policy == null)
            {
                throw new Exception("Policy not found for claim request.");
            }

            var claim = new ClaimRequest
            {
                PolicyId = policyId,
                IncidentDescription = claimDTO.IncidentDescription,
                ClaimAmountRequested = claimDTO.ClaimAmountRequested
            };

            _context.ClaimRequests.Add(claim);
            _context.SaveChanges();
        }

        public IEnumerable<ClaimRequest> CheckClaimStatus(int userId)
        {
            var claims = _context.ClaimRequests
                         .Where(c => c.Policy.Proposal.Vehicle.UserId == userId)
                         .ToList();

            return claims;
        }

        public IEnumerable<ClaimPayment> CheckClaimPaymentStatus(int userId)
        {
            var claimpayments = _context.ClaimPayments
                         .Where(c => c.ClaimRequest.Policy.Proposal.Vehicle.UserId == userId)
                         .ToList();

            return claimpayments;
        }

        public void EditUserDetails(int userId, UserEditDTO dto)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.UserId == userId);

            if (existingUser == null)
            {
                throw new Exception("User not found.");
            }

            if (!string.IsNullOrWhiteSpace(dto.FullName))
                existingUser.FullName = dto.FullName;

            if (!string.IsNullOrWhiteSpace(dto.Address))
                existingUser.Address = dto.Address;

            if (dto.DateOfBirth.HasValue)
                existingUser.DateOfBirth = dto.DateOfBirth.Value;

            if (!string.IsNullOrWhiteSpace(dto.AadhaarNumber))
                existingUser.AadhaarNumber = dto.AadhaarNumber;

            if (!string.IsNullOrWhiteSpace(dto.PANNumber))
                existingUser.PANNumber = dto.PANNumber;

            if (!string.IsNullOrWhiteSpace(dto.PhoneNumber))
                existingUser.PhoneNumber = dto.PhoneNumber;

            if (!string.IsNullOrWhiteSpace(dto.Email))
                existingUser.Email = dto.Email;

            if (!string.IsNullOrWhiteSpace(dto.Password))
                existingUser.Password = dto.Password; 

            _context.SaveChanges();
        }

        public void EditVehicleDetails(int vehicleId, VehicleEditDTO dto)
        {
            var existingVehicle = _context.Vehicles.FirstOrDefault(v => v.VehicleId == vehicleId);

            if (existingVehicle == null)
            {
                throw new Exception("Vehicle not found.");
            }

            if (!string.IsNullOrWhiteSpace(dto.VehicleNumber))
                existingVehicle.VehicleNumber = dto.VehicleNumber;

            if (!string.IsNullOrWhiteSpace(dto.VehicleType))
                existingVehicle.VehicleType = dto.VehicleType;

            if (!string.IsNullOrWhiteSpace(dto.Make))
                existingVehicle.Make = dto.Make;

            if (!string.IsNullOrWhiteSpace(dto.Model))
                existingVehicle.Model = dto.Model;

            if (dto.YearOfManufacture.HasValue)
                existingVehicle.YearOfManufacture = dto.YearOfManufacture.Value;

            if (!string.IsNullOrWhiteSpace(dto.ChassisNumber))
                existingVehicle.ChassisNumber = dto.ChassisNumber;

            _context.SaveChanges();
        }

        public void UploadDocument(int proposalId, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new Exception("No file uploaded.");
            }

            var proposal = _context.PolicyProposals.FirstOrDefault(p => p.ProposalId == proposalId);

            if (proposal == null)
            {
                throw new Exception("The Proposal doesn't exist.");
            }

            try
            {
                var uploadsFolder = Path.Combine("wwwroot", "UploadedFiles");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var relativeFilePath = Path.Combine("UploadedFiles", uniqueFileName);
                var absoluteFilePath = Path.Combine("wwwroot", relativeFilePath);

                using (var stream = new FileStream(absoluteFilePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                var document = new Document
                {
                    ProposalId = proposalId,
                    FileName = file.FileName,
                    FileType = file.ContentType,
                    FilePath = relativeFilePath
                };

                proposal.Status = "Document Submitted";

                _context.Documents.Add(document);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error while uploading document: " + ex.Message);
            }

        }

        public FileContentResult DownloadPolicyQuoteSummary(int proposalId)
        {
            var proposal = _context.PolicyProposals
                .Include(p => p.Vehicle)
                .Include(p => p.PolicyQuote)
                .Include(p => p.Policy)
                .FirstOrDefault(p => p.ProposalId == proposalId);

            if (proposal == null)
            {
                throw new Exception("Policy Proposal not found.");
            }

            var vehicle = proposal.Vehicle;
            var quote = proposal.PolicyQuote;
            var policy = proposal.Policy;

            var contentBuilder = new System.Text.StringBuilder();

            contentBuilder.AppendLine("Policy Quote Summary");
            contentBuilder.AppendLine("----------------------------");
            contentBuilder.AppendLine($"Proposal ID: {proposal.ProposalId}");
            contentBuilder.AppendLine($"Proposal Status: {proposal.Status}");
            contentBuilder.AppendLine($"Proposal Date: {proposal.ProposalDate:yyyy-MM-dd}");
            contentBuilder.AppendLine();

            if (vehicle != null)
            {
                contentBuilder.AppendLine("Vehicle Information:");
                contentBuilder.AppendLine($"Vehicle Type: {vehicle.VehicleType}");
                contentBuilder.AppendLine($"Vehicle Number: {vehicle.VehicleNumber}");
                contentBuilder.AppendLine($"Make: {vehicle.Make}");
                contentBuilder.AppendLine($"Model: {vehicle.Model}");
                contentBuilder.AppendLine($"Year of Manufacture: {vehicle.YearOfManufacture}");
                contentBuilder.AppendLine($"Chassis Number: {vehicle.ChassisNumber}");
                contentBuilder.AppendLine();
            }

            if (quote != null)
            {
                contentBuilder.AppendLine("Quote Information:");
                contentBuilder.AppendLine($"Quote ID: {quote.QuoteId}");
                contentBuilder.AppendLine($"Base Premium: {quote.BasePremiumAmount}");
                contentBuilder.AppendLine($"Add-On Premium: {quote.AddOnPremiumAmount}");
                contentBuilder.AppendLine($"Total Premium: {quote.TotalPremium}");
                contentBuilder.AppendLine($"Quote Date: {quote.QuoteDate:yyyy-MM-dd}");
                contentBuilder.AppendLine($"Expiry Date: {quote.ExpiryDate:yyyy-MM-dd}");
                contentBuilder.AppendLine();
            }

            if (policy != null)
            {
                contentBuilder.AppendLine("Policy Information:");
                contentBuilder.AppendLine($"Policy Number: {policy.PolicyNumber}");
                contentBuilder.AppendLine($"Activation Date: {policy.ActivationDate:yyyy-MM-dd}");
                contentBuilder.AppendLine($"Expiry Date: {policy.ExpiryDate:yyyy-MM-dd}");
                contentBuilder.AppendLine($"Policy Status: {policy.Status}");
                contentBuilder.AppendLine();
            }

            var fileBytes = System.Text.Encoding.UTF8.GetBytes(contentBuilder.ToString());

            return new FileContentResult(fileBytes, "text/plain")
            {
                FileDownloadName = $"PolicySummary_Proposal_{proposalId}.txt"
            };
        }

    }
}
