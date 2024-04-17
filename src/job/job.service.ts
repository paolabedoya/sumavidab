import Job from './job.model'
import type { Job as TJob } from '../utils/types'

const JobService = {
  getAllJobs: async (): Promise<TJob[]> => {
    const jobs = await Job.find()
    return jobs
  },
  getJobById: async (id: string): Promise<TJob | null> => {
    const job = await Job.findById(id)
    return job
  },
  createJob: async ({ name }: { name: string }): Promise<TJob> => {
    const newJob = new Job({ name })
    const resultDocument = await newJob.save()
    return resultDocument
  },
  updateJob: async ({ id, name }: { id: string, name: string }): Promise<TJob | null> => {
    const job = await Job.findOneAndUpdate({ _id: id }, { name, updatedAt: new Date() }, { new: true })
    return job
  },
  deleteJob: async (id: string): Promise<TJob | null> => {
    const job = await Job.findByIdAndDelete(id)
    return job
  }
}

export default JobService
