import { Response } from 'express'
import MedicalHistory from './medicalHistory.model'
import type { Request } from '../utils/types'
import type { MedicalHistory as TMedicalHistory } from '../utils/types'
import MedicalHistoryService from './medicalHistory.service'

const MedicalHistoryController = {
    getMedicalHistories: async (_req: Request, res: Response) => {
        try {
            const medicalHistories = await MedicalHistoryService.getAllMedicalHistories()
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

    getMedicalHistory: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const medicalHistory = await MedicalHistoryService.getMedicalHistoryById(id)
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

    createMedicalHistory: async (req: Request<TMedicalHistory>, res: Response) => {
        const { patient_id, appointment_id } = req.body

        try {
            const medicalHistory = MedicalHistoryService.createMedicalHistory({ patient_id, appointment_id})
            res.send({
                status: "success",
                medicalHistory
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el medicalHistory"
            })
        }
    },

    updateMedicalHistory: async (req: Request<TMedicalHistory, { id: string }>, res: Response) => {
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

            res.send({
                status: "success",
                medicalHistory
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el medicalHistory"
            })
        }

    },

    deleteMedicalHistory: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {
            const medicalHistory = await MedicalHistoryService.deleteMedicalHistory(id)

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

export default MedicalHistoryController
