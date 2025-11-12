import type { Prescription } from "./Prescription"

export interface Treatment {
   id:number
   height: string
   appointmentId: any
   weight: string
   tempeture: string
   pulse: string
   respiration: string
   bloodPressure: string
   problemDescription: string
   tests: string
   advice: string
   prescription: Prescription
}