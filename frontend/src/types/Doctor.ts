import type { User } from "./User"

export interface Doctor {
    id: number
    departmentId: number
    doctorNo: string
    designation: string
    biography: string
    user: User
    address: string
    city: string
    state: string
    zip: string
    fee: string
    signature: string
    status: unknown
}