import type { Doctor } from "./Doctor"
import type { Patient } from "./Patient"

export interface User {
    id: number
    username: string
    fullName: string
    email: string
    imageUrl: string
    password: string
    phone: string
    role: any
    status: boolean
    patient: Patient
    doctor: Doctor
    patientId: number
}