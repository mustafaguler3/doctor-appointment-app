import axiosClient from "../api/axiosClient";

const AppointmentService = {
    createAppointment: (data) => axiosClient.post("/appointments",data),
    getTodayAppointmentsByDoctor: () => axiosClient.get("/doctors/me/appointments/today"),
    getPatientAppointments: () => axiosClient.get("/patients/me/appointments"),
    cancelAppointment: (id) => axiosClient.put(`/patients/me/appointments/${id}`),
    getPatientAppointmentById: (id) => axiosClient.get("/patient/me/appointments/"+id),
    
    getAppointmentsByDoctor: (pageNumber,pageSize) => axiosClient.get(`/doctors/me/appointments?pageNumber=${pageNumber}&pageSize=${pageSize}`),

    getAppointmentDetailByDoctor: (id) => axiosClient.get("/doctors/me/appointments/"+id)
}

export default AppointmentService;