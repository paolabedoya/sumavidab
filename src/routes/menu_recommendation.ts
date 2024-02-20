import { Router } from 'express'
import menuRecommendationController from '../controllers/menu_recommendation'

const menuRecommendationRouter = Router()

menuRecommendationRouter.get("/", menuRecommendationController.getMenuRecommendations)
menuRecommendationRouter.get("/:id", menuRecommendationController.getMenuRecommendation)
menuRecommendationRouter.post("/", menuRecommendationController.createMenuRecommendation)
menuRecommendationRouter.put("/:id", menuRecommendationController.updateMenuRecommendation)
menuRecommendationRouter.delete("/:id", menuRecommendationController.deleteMenuRecommendation)

export default menuRecommendationRouter