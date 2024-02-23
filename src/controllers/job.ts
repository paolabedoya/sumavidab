import { Response } from 'express'
import Job from '../models/job'
import type { Request } from '../utils/types'
import type { Job as TJob } from '../utils/types'

const jobController = {
    getJobs: async (_req: Request, res: Response) => {
        try {
            const jobs = await Job.find()
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
            const job = await Job.findById(id)
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
            const newJob = new Job({ name })

            const resultDocument = await newJob.save()

            res.send({
                status: "success",
                job: resultDocument
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

            const job = await Job.findById(id)

            if (!job) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el job"
                })
            }

            job.name = name
            job.updatedAt = new Date()

            const resultDocument = await job.save()

            res.send({
                status: "success",
                job: resultDocument
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

            const job = await Job.findOneAndDelete({ _id: id })

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

export default jobController