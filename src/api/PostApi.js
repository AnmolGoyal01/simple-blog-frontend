import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? "https://simple-blog-backend-jitl.onrender.com/api/posts"
  : "/api/posts";

class PostAPI {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
    });
  }

  getAuthHeader() {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async createPost(data) {
    return this.api.post("/", data, this.getAuthHeader());
  }

  async getAllPosts(page = 1, limit = 10) {
    return this.api.get("/", {
      ...this.getAuthHeader(),
      params: { page, limit },
    });
  }

  async getPostById(id) {
    return this.api.get(`/${id}`, this.getAuthHeader());
  }

  async updatePost(id, data) {
    return this.api.put(`/${id}`, data, this.getAuthHeader());
  }

  async deletePost(id) {
    return this.api.delete(`/${id}`, this.getAuthHeader());
  }
}

const postAPI = new PostAPI();
export default postAPI;
