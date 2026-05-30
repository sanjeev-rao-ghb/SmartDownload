import axios from "axios";

const API = "https://smartdownload-backend-1.onrender.com/api/user";

export const getProjects = () => {
  return axios.get(`${API}/projects`);
};
