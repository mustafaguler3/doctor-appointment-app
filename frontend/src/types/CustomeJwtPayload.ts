import type { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  role: string;
  fullName: string
  id: number
  status: boolean
  imageUrl: string
}