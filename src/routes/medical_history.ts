import { Router } from 'express'
import medicalHistoryController from '../controllers/medical_history'

const medicalHistoryRouter = Router()

medicalHistoryRouter.get("/", medicalHistoryController.getMedicalHistories)
medicalHistoryRouter.get("/:id", medicalHistoryController.getMedicalHistory)
medicalHistoryRouter.post("/", medicalHistoryController.createMedicalHistory)
medicalHistoryRouter.put("/:id", medicalHistoryController.updateMedicalHistory)
medicalHistoryRouter.delete("/:id", medicalHistoryController.deleteMedicalHistory)

export default medicalHistoryRouter