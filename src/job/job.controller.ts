import { Response } from "express";
import JobService from "./job.service";
import type { Job as TJob } from "../utils/types";
import type { Request } from "../utils/types";

const JobController = {
  getJobs: async (_req: Request, res: Response) => {
    try {
      const jobs = await JobService.getAllJobs();

      return res.send(jobs);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getJob: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const job = await JobService.getJobById(id);

      if (!job) return res.status(404).send();

      return res.send(job);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createJob: async (req: Request<TJob>, res: Response) => {
    const { name } = req.body;

    try {
      const job = await JobService.createJob({ name });

      return res.status(201).send(job);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateJob: async (req: Request<TJob, { id: string }>, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const job = await JobService.updateJob({ _id: id, name });

      if (!job) return res.status(404).send();

      return res.send(job);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteJob: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const job = await JobService.deleteJob(id);

      if (!job) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default JobController;
