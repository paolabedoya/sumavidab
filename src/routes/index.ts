import { Router } from 'express'
import userRouter from './user'
import lifestyleRouter from './lifestyle'
import appointmentRouter from './appointment'
import countryRouter from './country'
import eventRouter from './event'
import contactRouter from './contact'

const mainRouter = Router()

mainRouter.use("/user", userRouter)
mainRouter.use("/lifestyle", lifestyleRouter)
mainRouter.use("/appointment", appointmentRouter)
mainRouter.use("/country", countryRouter)
mainRouter.use("/event", eventRouter)
mainRouter.use("/contact", contactRouter)

export default mainRouter