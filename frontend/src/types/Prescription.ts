import type { Appointment } from "./Appointment";
import type { Doctor } from "./Doctor";
import type { Medicine} from "./Medicine";
import type { Patient } from "./Patient";
import type { Treatment } from "./Treatment";

export interface Prescription {
    id: any
    doctor: Doctor
    patient: Patient
    appointment: Appointment
    medicines: Medicine[]
    treatment: Treatment
    advice: string
    symptoms: string[]
    diagnosis: string[]
    issueDate: any
}
