import { Router } from 'express'
import JobRouter from './job/job.router'
import RegionRouter from './region/region.router'
import AppointmentRouter from './appointment/appointment.router'

const router = Router()

router.use(JobRouter)
router.use(RegionRouter)
router.use(AppointmentRouter)

export default router