using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vis.DTOs;
using Vis.DTOs.OfficerDTOs;
using Vis.Exceptions;
using Vis.Helper;
using Vis.Model;
using Vis.Repository.Interfaces;
using Vis.Service;

namespace Vis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficerController : ControllerBase
    {
        private readonly IOfficerService _officerService;
        private readonly LogService _logService;

        public OfficerController(IOfficerService officerService, LogService logService)
        {
            _officerService = officerService;
            _logService = logService;
        }


        //[AllowAnonymous]
        [Authorize(Roles = "Admin")]
        [HttpPost("register-officer")]
        public ActionResult RegisterOfficer([FromBody] UserRegisterDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("User data is required.");
            }

            try
            {
                _officerService.RegisterOfficer(dto);
                return Ok("User registered successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpPost("create-basepremium")]
        public ActionResult CreateBasePremium([FromBody] BasePremiumCreateDTO dto)
        {
            if (dto == null)
                return BadRequest("Base premium data is required.");

            try
            {
                _officerService.CreateBasePremium(dto);
                return Ok("Base premium created successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpPost("create-addon")]
        public ActionResult CreateAddOn([FromBody] AddOnCreateDTO dto)
        {
            if (dto == null)
                return BadRequest("AddOn data is required.");

            try
            {
                _officerService.CreateAddOn(dto);
                return Ok("AddOn created successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        /*
        [HttpPost("create-claim-payment/{claimRequestId}")]
        public ActionResult CreateClaimPayment(int claimRequestId, [FromBody] ClaimPaymentCreateDTO dto)
        {
            if (dto == null)
                return BadRequest("ClaimPayment data is required.");

            try
            {
                _officerService.CreateClaimPayment(claimRequestId, dto);
                return Ok("ClaimPayment created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        */
        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpGet("view-policy-proposals")]
        public ActionResult<IEnumerable<PolicyProposal>> ViewPolicyProposals([FromQuery] int? vehicleId, [FromQuery] int? basePremiumId, [FromQuery] string? status)
        {
            try
            {
                var proposals = _officerService.ViewPolicyProposals(vehicleId, basePremiumId, status);

                if (!proposals.Any())
                {
                    return NotFound("No policy proposals found with the given filters.");
                }

                return Ok(proposals);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpPut("edit-proposal-status/{proposalId}")]
        public ActionResult EditProposalStatus(int proposalId, [FromQuery] ProposalStatus status, [FromQuery] int? addonId)
        {
            try
            {
                _officerService.EditProposalStatus(proposalId, status, addonId);
                return Ok("Proposal status updated successfully.");
            }
            catch (AddOnForAcceptedException ex)
            {
                _logService.LogError(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message); 
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpGet("view-payments")]
        public ActionResult<IEnumerable<Payment>> ViewPayments([FromQuery] int? quoteId, [FromQuery] string? paymentStatus)
        {
            try
            {
                var payments = _officerService.ViewPayments(quoteId, paymentStatus);

                if (!payments.Any())
                {
                    return NotFound("No payment records found with the given filters.");
                }

                return Ok(payments);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpGet("view-policies")]
        public ActionResult<IEnumerable<Policy>> ViewPolicies([FromQuery] int? proposalId, [FromQuery] string? status)
        {
            try
            {
                var policies = _officerService.ViewPolicies(proposalId, status);

                if (!policies.Any())
                {
                    return NotFound("No policies found with the given filters.");
                }

                return Ok(policies);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpGet("view-claim-requests")]
        public ActionResult<IEnumerable<ClaimRequest>> ViewClaimRequests([FromQuery] int? policyId, [FromQuery] string? claimStatus)
        {
            try
            {
                var requests = _officerService.ViewClaimRequests(policyId, claimStatus);

                if (!requests.Any())
                {
                    return NotFound("No claim requests found for the given filters.");
                }

                return Ok(requests);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpPut("edit-claimrequest-status/{claimRequestId}")]
        public ActionResult EditClaimRequestStatus(int claimRequestId, [FromQuery] ClaimStatus status)
        {
            try
            {
                _officerService.EditClaimRequestStatus(claimRequestId, status);
                return Ok("Claim status updated successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpGet("view-claim-payment")]
        public ActionResult<IEnumerable<ClaimPayment>> ViewClaimPayments([FromQuery] int? claimRequestId, [FromQuery] string? status)
        {
            try
            {
                var claimPayments = _officerService.ViewClaimPayments(claimRequestId, status);

                if (!claimPayments.Any())
                {
                    return NotFound("No claim payments found for the given filters.");
                }

                return Ok(claimPayments);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpPut("edit-claimpayment-status/{claimPaymentId}")]
        public ActionResult EditClaimPaymentStatus(int claimPaymentId, [FromQuery] ClaimPaymentStatus status)
        {
            try
            {
                _officerService.EditClaimPaymentStatus(claimPaymentId, status);
                return Ok("ClaimPayment status updated successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpGet("view-documents")]
        public ActionResult<IEnumerable<Document>> ViewDocuments()
        {
            var doc = _officerService.ViewDocuments();
            return Ok(doc);
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Officer")]
        [HttpGet("get-document/{documentId}")]
        public ActionResult GetDocument(int documentId)
        {
            try
            {
                var file = _officerService.GetDocument(documentId);
                return file; 
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message); 
            }
        }
        
    }
}
