import axiosClient from "../api/axiosClient";

export const DoctorService = {
    getDoctors: async (): Promise<any> => axiosClient.get(`/doctors`),
    searchDoctors: async (city?: string,departmentName?: string) : Promise<any> => axiosClient.get("/doctors/search",{
        params: {
            city,
            departmentName
        }
    })
}