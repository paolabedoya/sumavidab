import { Router } from 'express'
import JobController from './job.controller'

const JobRouter = Router()

JobRouter.get("/job/", JobController.getJobs)
JobRouter.get("/job/:id", JobController.getJob)
JobRouter.post("/job", JobController.createJob)
JobRouter.put("/job/:id", JobController.updateJob)
JobRouter.delete("/job/:id", JobController.deleteJob)

export default JobRouter
