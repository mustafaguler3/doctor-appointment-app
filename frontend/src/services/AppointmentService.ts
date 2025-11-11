import axiosClient from "../api/axiosClient";

const AppointmentService = {
    createAppointment: (data) => axiosClient.post("/appointments",data),
    getTodayAppointmentsByDoctor: () => axiosClient.get("/doctors/me/appointments/today"),
    getPatientAppointments: (pageNumber,pageSize,sort="appointmentDate,desc") => axiosClient.get("/patients/me/appointments",{
        params:{
            pageNumber,
            pageSize,
            sort
        }
    }),
    cancelAppointment: (id) => axiosClient.put(`/patients/me/appointments/${id}`),
    getPatientAppointmentById: (id) => axiosClient.get("/patient/me/appointments/"+id),
    getAppointmentsByDoctor: (pageNumber,pageSize,sort ="appointmentDate,desc") => axiosClient.get(`/doctors/me/appointments?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`),
    getAppointmentDetailByDoctor: (id) => axiosClient.get("/doctors/me/appointments/"+id)
}

export default AppointmentService;