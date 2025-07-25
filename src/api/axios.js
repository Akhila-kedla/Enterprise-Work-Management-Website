import axios from "axios";

const BASE_URL = "https://mockapi.io/api";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
