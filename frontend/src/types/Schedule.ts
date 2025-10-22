import type { Doctor } from "./Doctor";

export interface TimeSlot {
  time:string
  available: boolean;
}

export interface Schedule {
  id: number;
  doctor: Doctor;
  date: string;
  startTime:string
  endTime:string
  timeSlots: TimeSlot[];
}