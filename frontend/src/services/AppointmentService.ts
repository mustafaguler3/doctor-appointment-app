import axiosClient from "../api/axiosClient";

const AppointmentService = {
    createAppointment: (data) => axiosClient.post("/appointments/new",data),
    getPatientAppointments: () => axiosClient.get("/appointments/me"),
    getAppointmentById: (id) => axiosClient.get("/appointments/"+id)
}

export default AppointmentService;