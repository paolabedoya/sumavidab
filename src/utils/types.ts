// Type definitions for the database
export type UserRol = "admin" | "patient" | "professional"

export type User = {
    _id?: string
    rol: UserRol
    job_id: number
    active: boolean
    country_id: string
    region: string
    gender: "f" | "m"
    group_id: string
    lifestyle_id: string
    events?: string[]
    createdAt?: Date
    updatedAt?: Date
}

export type AppointmentType = "psycology" | "sport"

export type Appointment = {
    _id?: string
    type: AppointmentType
    appointment_id: string
    createdAt?: Date
    updatedAt?: Date
}

export type Contact = {
    _id?: string
    name: string
    phone: string
    email: string
    message: string
    createdAt?: Date
    updatedAt?: Date
}

export type Country = {
    _id?: string
    name: string
    createdAt?: Date
    updatedAt?: Date
}

export type EventVenueType = "remote" | "in_person"

export type Event = {
    _id?: string
    start_date: Date
    end_date: Date
    description?: string
    venue_type: EventVenueType
    worker_id: string
    createdAt?: Date
    updatedAt?: Date
}

export type Group = {
    _id?: string
    name: string
    createdAt?: Date
    updatedAt?: Date
}

export type JobName = "nutricionist" | "psychologist" | "trainer"

export type Job = {
    _id?: string
    name: JobName
    createdAt?: Date
    updatedAt?: Date
}

export type Lifestyle = {
    _id?: string
    name: string
    createdAt?: Date
    updatedAt?: Date
}

export type MedicalHistory = {
    _id?: string
    patient_id: string
    appointment_id: string
    createdAt?: Date
    updatedAt?: Date
}

export type MenuRecommendation = {
    _id?: string
    breakfast: string
    brunch: string
    lunch: string
    afternoon_snack: string
    dinner: string
    image_url: string
    professional_id: string
    createdAt?: Date
    updatedAt?: Date
}

export type Recipe = {
    _id?: string
    name: string
    ingredients: string[]
    steps: string[]
    image_url: string
    createdAt?: Date
    updatedAt?: Date
}

export type Region = {
    _id?: string
    name: string
    createdAt?: Date
    updatedAt?: Date
}

// util types
export type Request<B = any, P = any> = {
    body: B
    params: P
}
