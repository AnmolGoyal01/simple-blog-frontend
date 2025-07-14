import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? "https://simple-blog-backend-jitl.onrender.com/api"
  : "/api";

class HealthcheckAPI {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
    });
  }

  async getHealth() {
    return this.api.get("/health");
  }
}

const healthcheckAPI = new HealthcheckAPI();

export default healthcheckAPI;
