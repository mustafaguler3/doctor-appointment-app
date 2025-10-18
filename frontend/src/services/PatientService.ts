import axiosClient from "../api/axiosClient";

const patientService = {
    update: (data): Promise<any> => axiosClient.post("/patients/update",data)
}

export default patientService;