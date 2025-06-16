import axios from '../utils/axiosConfig';

const API_URL = 'https://localhost:7224/api/Client';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register-user`, userData);
  return response.data;
};

export const registerVehicle = async (userId, vehicleData) => {
  const response = await axios.post(`${API_URL}/register-vehicle/${userId}`, vehicleData);
  return response.data;
};

export const getUserVehicles = async (userId) => {
  const response = await axios.get(`${API_URL}/my-vehicles/${userId}`);
  return response.data;
};

export const proposePolicy = async (userId, data) => {
  const response = await axios.post(`${API_URL}/propose-policy/${userId}`, data);
  return response.data;
};

export const getProposalStatus = async (userId) => {
  const response = await axios.get(`${API_URL}/proposal-status/${userId}`);
  return response.data;
};

export const getPolicyQuotes = async (userId) => {
  const response = await axios.get(`${API_URL}/view-my-quotes/${userId}`);
  return response.data;
};

export const makePolicyPayment = async (proposalId, paymentData) => {
  const response = await axios.post(
    `${API_URL}/make-payment?policyProposalId=${proposalId}`,
    paymentData
  );
  return response.data;
};

export const getUnpaidProposals = async (userId) => {
  const response = await axios.get(`${API_URL}/get-unpaid-proposals/${userId}`);
  return response.data;
};

export const getMyPolicies = async (userId) => {
  const response = await axios.get(`${API_URL}/view-my-policies/${userId}`);
  return response.data;
};

export const getMyPayments = async (userId) => {
  const response = await axios.get(`${API_URL}/view-my-payments/${userId}`);
  return response.data;
};

export const requestClaim = async (policyId, claimDTO) => {
  const response = await axios.post(`${API_URL}/request-claim?policyId=${policyId}`, claimDTO);
  return response.data;
};

export const getClaimStatus = async (userId) => {
  const response = await axios.get(`${API_URL}/check-claim-status/${userId}`);
  return response.data;
};

export const getClaimPaymentStatus = async (userId) => {
  const response = await axios.get(`${API_URL}/check-claim-payment-status/${userId}`);
  return response.data;
};

export const editUserDetails = async (userId, updateData) => {
  const response = await axios.put(`${API_URL}/edit-user/${userId}`, updateData);
  return response.data;
};

export const updateVehicleDetails = async (vehicleId, vehicleData) => {
  const response = await axios.put(`${API_URL}/edit-vehicle/${vehicleId}`, vehicleData);
  return response.data;
};

export const uploadDocument = async (proposalId, file) => {
  const formData = new FormData();
  formData.append("ProposalId", proposalId);
  formData.append("File", file);

  const response = await axios.post(`${API_URL}/upload-document`, formData);
  return response.data;
};

export const downloadPolicyQuoteSummary = async (proposalId) => {
  const response = await axios.get(`${API_URL}/DownloadPolicyQuoteSummary/${proposalId}`, {
    responseType: "blob",
  });
  return response;
};



