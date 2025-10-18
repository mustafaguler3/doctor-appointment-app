import axiosClient from "../api/axiosClient";

const AuthService = {
    login: (data): Promise<any> => axiosClient.post("/auth/login",data),
    register: (data) => axiosClient.post("/auth/register",data),
    refresh: (data) => axiosClient.post("/auth/refresh",data),
    getCurrentUser: () => axiosClient.get("/auth/me")
}

export default AuthService;