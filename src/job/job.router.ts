import { Router } from 'express'
import JobController from './job.controller'

const JobRouter = Router()

JobRouter.get("/router/", JobController.getJobs)
JobRouter.get("/router/:id", JobController.getJob)
JobRouter.post("/router", JobController.createJob)
JobRouter.put("/router/:id", JobController.updateJob)
JobRouter.delete("/router/:id", JobController.deleteJob)

export default JobRouter