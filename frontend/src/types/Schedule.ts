import type { Doctor } from "./Doctor";

export interface TimeSlot {
  id: number
  time:string
  available: boolean;
  schedule: Schedule;
  bookedPatients: number
}

export interface Schedule {
  id: number;
  doctor: Doctor;
  date: string;
  startTime:string
  endTime:string
  maxPatients: number
  timeSlots: TimeSlot[];
}