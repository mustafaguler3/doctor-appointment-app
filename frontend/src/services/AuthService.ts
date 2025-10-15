import axiosClient from "../api/axiosClient";

const AuthService = {
    login: (data): Promise<any> => axiosClient.post("/auth/login",data),
    register: (data) => axiosClient.post("/auth/register",data),
    getCurrentUser: () => axiosClient.get("/auth/me")
}

export default AuthService;