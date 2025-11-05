import axiosClient from "../api/axiosClient";

const AppointmentService = {
    createAppointment: (data) => axiosClient.post("/appointments",data),
    getTodayAppointmentsByDoctor: () => axiosClient.get("/doctors/me/appointments/today"),
    getPatientAppointments: () => axiosClient.get("/patients/me/appointments"),
    cancelAppointment: (id) => axiosClient.put(`/patients/me/appointments/${id}`),
    getPatientAppointmentById: (id) => axiosClient.get("/patient/me/appointments/"+id),
    getAppointmentsByDoctor: () => axiosClient.get("/doctors/me/appointments"),
    getAppointmentDetailByDoctor: (id) => axiosClient.get("/doctors/me/appointments/"+id)
}

export default AppointmentService;