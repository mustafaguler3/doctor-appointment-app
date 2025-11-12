import type { Department } from "./Department"
import type { Schedule } from "./Schedule"
import type { User } from "./User"

export interface Doctor {
    id: any
    departmentId: number
    doctorNo: string
    department: Department
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
    schedules: Schedule[]
    country: string
    specialization: string[]
    experience: any
    reviews: any[]
}