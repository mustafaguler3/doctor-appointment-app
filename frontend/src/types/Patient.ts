import type { User } from "./User";

export interface Patient {
    id: any
    user: User
    patientNo: string
    insuranceNumber: string
    bloodGroup: string
    gender: string
    state: string
    zip: string
    city: string
    address: string
}