import axiosClient from "../api/axiosClient";

const ContactService = {
    saveMessage: (data): Promise<any> => axiosClient.post(`/contact/save`,data,{
        headers: {
            "Content-Type":"application/json"
        }
    }) 
}

export default ContactService;