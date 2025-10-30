import axiosClient from "../api/axiosClient";

const ScheduleService =  {
    findSchedulesByDoctor: (doctorId,date) => axiosClient.get("/schedules/doctor", {
        params: {
            doctorId,
            date
        }
    }) 
}

export default ScheduleService;