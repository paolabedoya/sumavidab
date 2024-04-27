import { Router } from 'express'
import MenuRecommendationController from './menuRecommendation.controller'

const MenuRecommendationRouter = Router()

MenuRecommendationRouter.get("/recommendation/", MenuRecommendationController.getMenuRecommendations)
MenuRecommendationRouter.get("/recommendation/:id", MenuRecommendationController.getMenuRecommendation)
MenuRecommendationRouter.post("/recommendation/", MenuRecommendationController.createMenuRecommendation)
MenuRecommendationRouter.put("/recommendation/:id", MenuRecommendationController.updateMenuRecommendation)
MenuRecommendationRouter.delete("/recommendation/:id", MenuRecommendationController.deleteMenuRecommendation)

export default MenuRecommendationRouter
