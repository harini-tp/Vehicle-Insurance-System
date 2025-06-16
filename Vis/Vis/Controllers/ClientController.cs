using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vis.DTOs;
using Vis.DTOs.ClientDTOs;
using Vis.Exceptions;
using Vis.Model;
using Vis.Repository.Interfaces;
using Vis.Service;

namespace Vis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly LogService _logService;

        public ClientController(IClientService clientService, LogService logService)
        {
            _clientService = clientService;
            _logService = logService;
        }


        [AllowAnonymous]
        [HttpPost("register-user")]
        public ActionResult RegisterClient([FromBody] UserRegisterDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("User data is required.");
            }

            try
            {
                _clientService.RegisterClient(dto);
                return Ok("User registered successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpPost("register-vehicle/{userId}")]
        public ActionResult RegisterVehicle(int userId, [FromBody] VehicleRegisterDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Vehicle data is required.");
            }

            try
            {
                _clientService.RegisterVehicle(userId, dto);
                return Ok("Vehicle registered successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpGet("my-vehicles/{userId}")]
        public ActionResult<IEnumerable<Vehicle>> ViewMyVehicles(int userId)
        {
            try
            {
                var vehicles = _clientService.ViewMyVehicles(userId);
                if (!vehicles.Any())
                {
                    return NotFound("No vehicles found for this user.");
                }

                return Ok(vehicles);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpPost("propose-policy/{userId}")]
        public ActionResult ProposeAPolicy(int userId, [FromBody] PolicyProposalDTO dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest("Policy proposal is required.");
                }

                _clientService.ProposeAPolicy(userId, dto);
                return Ok("Policy proposal submitted.");
            }
            catch (UnauthorizedVehicleAccessException ex)
            {
                _logService.LogError(ex);
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message); 
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpGet("proposal-status/{userId}")]
        public ActionResult<IEnumerable<PolicyProposal>> CheckProposalStatus(int userId)
        {
            try
            {
                var proposals = _clientService.CheckProposalStatus(userId);
                if (!proposals.Any())
                {
                    return NotFound("No proposals found for this user.");
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
        [Authorize(Roles = "Client")]
        [HttpGet("view-my-quotes/{userId}")]
        public ActionResult<IEnumerable<PolicyQuote>> ViewMyQuotes(int userId)
        {
            try
            {
                var quotes = _clientService.ViewMyQuotes(userId);

                if (!quotes.Any())
                {
                    return NotFound("No quotes found for this user.");
                }

                return Ok(quotes);
            }
            catch(Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpGet("get-unpaid-proposals/{userId}")]
        public ActionResult<IEnumerable<UnpaidProposalDTO>> GetUnpaidProposals(int userId)
        {
            try
            {
                var result = _clientService.GetUnpaidProposals(userId);
                if (!result.Any())
                {
                    return NotFound("No unpaid proposals found.");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpPost("make-payment")]
        public ActionResult MakePayment([FromQuery] int policyProposalId, [FromBody] PolicyPaymentDTO paymentDto)
        {
            if (paymentDto == null)
            {
                return BadRequest("Payment data is required.");
            }

            try
            {
                _clientService.MakePayment(policyProposalId, paymentDto);  
                return Ok("Payment successful and policy created.");
            }
            catch (QuoteNotFoundException ex)
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
        [Authorize(Roles = "Client")]
        [HttpGet("view-my-policies/{userId}")]
        public ActionResult<IEnumerable<MyPolicyDTO>> ViewMyPolicy(int userId)
        {
            try
            {
                var policies = _clientService.ViewMyPolicy(userId);
                if (!policies.Any())
                {
                    return NotFound("No policies found for this user.");
                }

                return Ok(policies);
            }
            catch(Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpGet("view-my-payments/{userId}")]
        public ActionResult<IEnumerable<MyPaymentDTO>> ViewMyPayments(int userId)
        {
            try
            {
                var payments = _clientService.ViewMyPayments(userId);
                if (!payments.Any())
                {
                    return NotFound("No payments found for this user.");
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
        [Authorize(Roles = "Client")]
        [HttpPost("request-claim")]
        public ActionResult RequestAClaim([FromQuery] int policyId, [FromBody] ClaimRequestDTO dto)
        {
            if (dto == null)
                return BadRequest("Claim request is required.");

            try
            {
                var claimDTO = new ClaimRequestDTO
                {
                    IncidentDescription = dto.IncidentDescription,
                    ClaimAmountRequested = dto.ClaimAmountRequested
                };

                _clientService.RequestAClaim(policyId, claimDTO);
                return Ok("Claim requested successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpGet("check-claim-status/{userId}")]
        public ActionResult<IEnumerable<ClaimRequest>> CheckClaimStatus(int userId)
        {
            try
            {
                var claims = _clientService.CheckClaimStatus(userId);
                if (!claims.Any())
                {
                    return NotFound("No claim requests found for this user.");
                }

                return Ok(claims);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpGet("check-claim-payment-status/{userId}")]
        public ActionResult<IEnumerable<ClaimPayment>> CheckClaimPaymentStatus(int userId)
        {
            try
            {
                var claimrequests = _clientService.CheckClaimPaymentStatus(userId);
                if (!claimrequests.Any())
                {
                    return NotFound("No claim requests found for this user.");
                }

                return Ok(claimrequests);
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpPut("edit-user/{userId}")]
        public ActionResult EditUserDetails(int userId, [FromBody] UserEditDTO dto)
        {
            if (dto == null)
                return BadRequest("Valid user data is required.");

            try
            {
                _clientService.EditUserDetails(userId, dto);
                return Ok("User details updated successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpPut("edit-vehicle/{vehicleId}")]
        public ActionResult EditVehicleDetails(int vehicleId, [FromBody] VehicleEditDTO dto)
        {
            if (dto == null)
                return BadRequest("Valid vehicle data is required.");

            try
            {
                _clientService.EditVehicleDetails(vehicleId, dto);
                return Ok("Vehicle details updated successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }
        
        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpPost("upload-document")]
        public ActionResult UploadDocument([FromForm] DocumentUploadDTO dto)
        {
            try
            {
                _clientService.UploadDocument(dto.ProposalId, dto.File);
                return Ok("Document uploaded successfully.");
            }
            catch (Exception ex)
            {
                _logService.LogError(ex);
                return StatusCode(500, ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Client")]
        [HttpGet("DownloadPolicyQuoteSummary/{proposalId}")]
        public ActionResult DownloadPolicyQuoteSummary(int proposalId)
        {
            try
            {
                var file = _clientService.DownloadPolicyQuoteSummary(proposalId);
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
