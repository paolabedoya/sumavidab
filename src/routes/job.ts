import { Router } from 'express'
import jobController from '../controllers/job'

const jobRouter = Router()

jobRouter.get("/", jobController.getJobs)
jobRouter.get("/:id", jobController.getJob)
jobRouter.post("/", jobController.createJob)
jobRouter.put("/:id", jobController.updateJob)
jobRouter.delete("/:id", jobController.deleteJob)

export default jobRouter