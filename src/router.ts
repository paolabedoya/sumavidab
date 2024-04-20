import { Router } from 'express'
import JobRouter from './job/job.router'
import RegionRouter from './region/region.router'
import AppointmentRouter from './appointment/appointment.router'
import GroupRouter from './group/group.router'
import LifestyleRouter from './lifestyle/lifestyle.router'
import CountryRouter from './country/country.router'
import RecipeRouter from './recipe/recipe.router'
import ContactRouter from './contact/contact.router'
import UserRouter from './user/user.router'

const router = Router()

router.use(JobRouter)
router.use(RegionRouter)
router.use(AppointmentRouter)
router.use(GroupRouter)
router.use(LifestyleRouter)
router.use(CountryRouter)
router.use(RecipeRouter)
router.use(ContactRouter)
router.use(UserRouter)

export default router
