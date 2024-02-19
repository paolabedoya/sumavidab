import { Request, Response } from 'express'
import MedicalHistory from '../models/medical_history'

const medicalHistoryController = {
    getMedicalHistories: async (req: Request, res: Response) => {
        try {
            const medicalHistories = await MedicalHistory.find()
            res.send({
                status: "success",
                medicalHistories
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los medicalHistory"
            })
        }
    },

    getMedicalHistory: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const medicalHistory = await MedicalHistory.findById(id)
            res.send({
                status: "success",
                medicalHistory
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el medicalHistory"
            })
        }
    },

    createMedicalHistory: async (req: Request, res: Response) => {
        const { patient_id, appointment_id } = req.body

        try {
            const newMedicalHistory = new MedicalHistory({
                patient_id,
                appointment_id
            })

            const resultDocument = await newMedicalHistory.save()

            res.send({
                status: "success",
                medicalHistory: resultDocument
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el medicalHistory"
            })
        }
    },

    updateMedicalHistory: async (req: Request, res: Response) => {
        const { id } = req.params
        const { patient_id, appointment_id } = req.body

        try {

            const medicalHistory = await MedicalHistory.findById(id)

            if (!medicalHistory) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el medicalHistory"
                })
            }
            
            medicalHistory.patient_id = patient_id
            medicalHistory.appointment_id = appointment_id
            medicalHistory.updatedAt = new Date()

            const resultDocument = await medicalHistory.save()

            res.send({
                status: "success",
                medicalHistory: resultDocument
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el medicalHistory"
            })
        }

    },

    deleteMedicalHistory: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const medicalHistory = await MedicalHistory.findOneAndDelete({ _id: id })

            if (!medicalHistory) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el medicalHistory"
                })
            }

            return res.send({
                status: "success",
                medicalHistory
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el medicalHistory"
            })
        }

    },
}

export default medicalHistoryController