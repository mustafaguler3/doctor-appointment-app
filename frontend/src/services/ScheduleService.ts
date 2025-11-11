import axiosClient from "../api/axiosClient";

const ScheduleService =  {
    findSchedulesByDoctor: (doctorId,date) => axiosClient.get("/schedules/doctor", {
        params: {
            doctorId,
            date
        }
    }),
    createSchedule: (data) => axiosClient.post("/schedules/new",data) 
}

export default ScheduleService;