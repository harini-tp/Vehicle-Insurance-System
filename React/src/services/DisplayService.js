import axios from "../utils/axiosConfig";

const API_URL = "https://localhost:7224/api/Display";

export const getBasePremiumPlans = async () => {
  const response = await axios.get(`${API_URL}/view-basepremium-plans`);
  return response.data;
};

export const getAddOnPlans = async () => {
  const response = await axios.get(`${API_URL}/view-addons`);
  return response.data;
};

