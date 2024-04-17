import { Response } from 'express'
import JobService from './job.service'
import type { Job as TJob } from '../utils/types'
import type { Request } from '../utils/types'

const JobController = {
    getJobs: async (_req: Request, res: Response) => {
        try {
            const jobs = await JobService.getAllJobs()
            res.send({
                status: "success",
                jobs
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los jobs"
            })
        }
    },

    getJob: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const job = JobService.getJobById(id)
            res.send({
                status: "success",
                job
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el job"
            })
        }
    },

    createJob: async (req: Request<TJob>, res: Response) => {
        const { name } = req.body

        try {
            const job = await JobService.createJob({ name })
            res.send({
                status: "success",
                job
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el job"
            })
        }
    },

    updateJob: async (req: Request<TJob, { id: string }>, res: Response) => {
        const { id } = req.params
        const { name } = req.body

        try {
            const job = await JobService.updateJob({ id, name })

            if (!job) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el job"
                })
            }

            res.send({
                status: "success",
                job
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el job"
            })
        }

    },

    deleteJob: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {
            const job = await JobService.deleteJob(id)
            if (!job) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el job"
                })
            }

            return res.send({
                status: "success",
                job
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el job"
            })
        }

    },
}

export default JobController
