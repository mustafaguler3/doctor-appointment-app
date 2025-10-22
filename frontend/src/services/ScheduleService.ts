import axiosClient from "../api/axiosClient";

const ScheduleService =  {
    findScheduleByDoctor: (doctorId) => axiosClient.get("/schedules", {
        params: {
            doctorId
        }
    }) 
}

export default ScheduleService;