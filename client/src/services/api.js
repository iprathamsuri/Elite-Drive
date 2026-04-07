import axios from "axios";

const API = axios.create({
  baseURL: "https://elite-drive.onrender.com",
});

export default API;