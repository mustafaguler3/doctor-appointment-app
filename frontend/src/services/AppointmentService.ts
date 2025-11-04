import axiosClient from "../api/axiosClient";

const AppointmentService = {
    createAppointment: (data) => axiosClient.post("/appointments/new",data),
    getPatientAppointments: () => axiosClient.get("/appointments/me"),
    cancelAppointment: (id) => axiosClient.put(`/appointments/me/${id}/cancel`),
    getAppointmentById: (id) => axiosClient.get("/appointments/"+id),
    getAppointmentsByDoctor: () => axiosClient.get("/appointments/doctor/appointment-all"),
    getAppointmentDetailByDoctor: (id) => axiosClient.get("/appointments/doctor/appointments/"+id)
}

export default AppointmentService;