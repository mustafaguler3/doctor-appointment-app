import type { Doctor } from "./Doctor"
import type { Patient } from "./Patient"
import type { Schedule } from "./Schedule"

export interface Appointment {
    id: number
    doctorId: number
    scheduleId: number
    notes: string
    doctor: Doctor
    patient: Patient
    status: any
    schedule: Schedule
    appointmentTime: any
    appointmentDate: any
    createdAt: Date
}