import axiosClient from "../api/axiosClient";

const AppointmentService = {
    createAppointment: (data) => axiosClient.post("/appointments/new",data),
    getPatientAppointments: () => axiosClient.get("/appointments/me")
}

export default AppointmentService;