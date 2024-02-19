
export type User = {
    id: string
    rol: "admin" | "patient" | "professional"
    job_id: number
    active: boolean
    country_id: string
    region: string
    gender: "f" | "m"
    group_id: string
    lifestyle_id: string
    createdAt?: Date
    updatedAt?: Date
}