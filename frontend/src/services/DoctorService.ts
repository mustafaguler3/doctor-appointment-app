import axiosClient from '../api/axiosClient';

export const DoctorService = {
    getDoctorById: (id: number) => axiosClient.get("/doctors/"+id),
    getDoctors: async (): Promise<any> => axiosClient.get(`/doctors`),
    searchDoctors: async (city?: string,departmentName?: string) : Promise<any> => axiosClient.get("/doctors/search",{
        params: {
            city,
            departmentName
        }
    })
}