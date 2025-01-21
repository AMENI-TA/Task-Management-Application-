

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data.token;
};
