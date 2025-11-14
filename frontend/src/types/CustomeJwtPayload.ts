import type { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  role: string;
  patientId: number
  fullName: string
  id: number
  status: boolean
  imageUrl: string
}