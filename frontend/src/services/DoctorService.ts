import axiosClient from "../api/axiosClient";

export const DoctorService = {
    getDoctors: async (): Promise<any> => axiosClient.get(`/doctors`)
}