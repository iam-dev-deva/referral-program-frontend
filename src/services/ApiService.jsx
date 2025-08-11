import axios from "axios";
import config from "./../config/config";

const apiClient = axios.create({
  baseURL: config.BASE_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export const registerUser = async (userData) => {
  const res = await apiClient.post("users/register", userData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await apiClient.post("users/login", credentials);
  return res.data;
};

export const getMyReferral = async () => {
  const res = await apiClient.get("users/referral/me");
  return res.data;
};

export const redeemReferral = async () => {
  const res = await apiClient.post("/users/referral/redeem");
  return res.data;
};

export const logoutUser = async () => {
  const res = await apiClient.post("users/logout");
  return res.data;
};

export const checkAuth = async () => {
  const res = await apiClient.get("users/check-auth");
  return res.data;
};