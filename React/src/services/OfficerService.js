import axios from "../utils/axiosConfig";

const API_URL = "https://localhost:7224/api/Officer";

export const createBasePremium = async (basePremiumData) => {
  const response = await axios.post(`${API_URL}/create-basepremium`, basePremiumData);
  return response.data;
};

export const createAddOn = async (addOnData) => {
  const response = await axios.post(`${API_URL}/create-addon`, addOnData);
  return response.data;
};

export const viewPolicyProposals = async (basePremiumId, status) => {
  const params = {};
  if (basePremiumId) params.basePremiumId = basePremiumId;
  if (status) params.status = status;

  const response = await axios.get(`${API_URL}/view-policy-proposals`, {
    params,
  });
  return response.data;
};

export const editProposalStatus = async (proposalId, status, addonId) => {
  const url = `${API_URL}/edit-proposal-status/${proposalId}`;
  const response = await axios.put(
    `${url}?status=${status}${addonId ? `&addonId=${addonId}` : ""}`
  );
  return response.data;
};

export const getPayments = async () => {
  const response = await axios.get(`${API_URL}/view-payments`);
  return response.data;
};

export const viewPolicies = async (proposalId, status) => {
  const params = {};
  if (proposalId) params.proposalId = proposalId;
  if (status) params.status = status;

  const response = await axios.get(`${API_URL}/view-policies`, { params });
  return response.data;
};

export const viewClaimRequests = async (policyId, claimStatus) => {
  const params = {};
  if (policyId) params.policyId = policyId;
  if (claimStatus) params.claimStatus = claimStatus;

  const response = await axios.get(`${API_URL}/view-claim-requests`, { params });
  return response.data;
};

export const editClaimRequestStatus = async (claimRequestId, status) => {
  const response = await axios.put(
    `${API_URL}/edit-claimrequest-status/${claimRequestId}`,
    null,
    {
      params: { status },
    }
  );
  return response.data;
};

export const viewClaimPayments = async (claimRequestId, status) => {
  const params = {};
  if (claimRequestId) params.claimRequestId = claimRequestId;
  if (status) params.status = status;

  const response = await axios.get(`${API_URL}/view-claim-payment`, { params });
  return response.data;
};

export const editClaimPaymentStatus = async (claimPaymentId, status) => {
  const response = await axios.put(
    `${API_URL}/edit-claimpayment-status/${claimPaymentId}`,
    null,
    { params: { status } }
  );
  return response.data;
};

export const viewDocuments = async () => {
  const response = await axios.get(`${API_URL}/view-documents`);
  return response.data;
};

export const getDocument = async (documentId) => {
  const response = await axios.get(`${API_URL}/get-document/${documentId}`, {
    responseType: "blob", 
  });
  return response;
};

