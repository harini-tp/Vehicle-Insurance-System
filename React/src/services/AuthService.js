import axios from 'axios';

const API_URL = "https://localhost:7224/api/Authentication";

const login = async (credentials) => {
  const response = await axios.post(API_URL, credentials);
  const { token, role, name } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("name", name);

  return { token, role, name };
};

export default { login };