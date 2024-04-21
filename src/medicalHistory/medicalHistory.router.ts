import { Router } from 'express'
import MedicalHistoryController from './medicalHistory.controller'

const MedicalHistoryRouter = Router()

MedicalHistoryRouter.get("/", MedicalHistoryController.getMedicalHistories)
MedicalHistoryRouter.get("/:id", MedicalHistoryController.getMedicalHistory)
MedicalHistoryRouter.post("/", MedicalHistoryController.createMedicalHistory)
MedicalHistoryRouter.put("/:id", MedicalHistoryController.updateMedicalHistory)
MedicalHistoryRouter.delete("/:id", MedicalHistoryController.deleteMedicalHistory)

export default MedicalHistoryRouter
