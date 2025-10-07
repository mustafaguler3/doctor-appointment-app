import axiosClient from "../api/axiosClient";

const DepartmentService = {
    findAllDepartments: (): any => axiosClient.get(`/departments`) 
}

export default DepartmentService;