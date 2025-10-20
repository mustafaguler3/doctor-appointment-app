import axiosClient from "../api/axiosClient";

const patientService = {
    update: (data): Promise<any> => axiosClient.post("/patients/update",data,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export default patientService;