import type { Doctor } from "./Doctor"

export interface Department {
    id: number
    icon: string
    name: string
    shortDescription: string
    description: string
    doctors: Doctor[]
    location: string
    photos: any[]
    phone: string
    hours: string
}