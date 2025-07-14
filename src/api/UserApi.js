import axios from "axios";

const BASE_URL = "/api/auth";

class UserAPI {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
    });
  }

  async register(data) {
    return this.api.post("/register", data);
  }

  async login(data) {
    return this.api.post("/login", data);
  }

  async getCurrentUser() {
    const token = localStorage.getItem("token");
    return this.api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const userAPI = new UserAPI();
export default userAPI;
