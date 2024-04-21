import { Router } from 'express'
import MedicalHistoryController from './medicalHistory.controller'

const MedicalHistoryRouter = Router()

MedicalHistoryRouter.get("/history/", MedicalHistoryController.getMedicalHistories)
MedicalHistoryRouter.get("/history/:id", MedicalHistoryController.getMedicalHistory)
MedicalHistoryRouter.post("/history/", MedicalHistoryController.createMedicalHistory)
MedicalHistoryRouter.put("/history/:id", MedicalHistoryController.updateMedicalHistory)
MedicalHistoryRouter.delete("/history/:id", MedicalHistoryController.deleteMedicalHistory)

export default MedicalHistoryRouter
