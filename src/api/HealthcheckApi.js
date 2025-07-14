import axios from "axios";

const BASE_URL = "/api";

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
