import axios from "axios";
const api = axios.create({
  baseURL: "https://elite-drive.onrender.com",
});

export default api;