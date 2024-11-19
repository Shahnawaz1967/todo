import axios from 'axios';

const API_URL = 'https://todo-waxj.onrender.com/api/users';

export const loginUser = async (credentials) => {
  const { data } = await axios.post(`${API_URL}/login`, credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post(`${API_URL}/register`, userData);
  return data;
};
