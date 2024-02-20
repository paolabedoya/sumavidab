import { Router } from 'express'
import appointmentRouter from './appointment'
import contactRouter from './contact'
import countryRouter from './country'
import eventRouter from './event'
import groupRouter from './group'
import jobRouter from './job'
import lifestyleRouter from './lifestyle'
import medicalHistoryRouter from './medical_history'
import menuRecommendationRouter from './menu_recommendation'
import recipeRouter from './recipe'
import regionRouter from './region'
import userRouter from './user'

const mainRouter = Router()

mainRouter.use("/appointment", appointmentRouter)
mainRouter.use("/contact", contactRouter)
mainRouter.use("/country", countryRouter)
mainRouter.use("/event", eventRouter)
mainRouter.use("/group", groupRouter)
mainRouter.use("/jobRouter", jobRouter)
mainRouter.use("/lifestyle", lifestyleRouter)
mainRouter.use("/medical_history", medicalHistoryRouter)
mainRouter.use("/menu_recommendation", menuRecommendationRouter)
mainRouter.use("/recipe", recipeRouter)
mainRouter.use("/region", regionRouter)
mainRouter.use("/user", userRouter)

export default mainRouter