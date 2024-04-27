import { Response } from 'express'
import type { Request } from '../utils/types'
import type { MenuRecommendation as TMenuRecommendation } from '../utils/types'
import MenuRecommendationService from './menuRecommendation.service'

const MenuRecommendationController = {
    getMenuRecommendations: async (_req: Request, res: Response) => {
        try {
            const recommendations = await MenuRecommendationService.getAllMenuRecommendations()
            res.send({
                status: "success",
                recommendations
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los menuRecommendation"
            })
        }
    },

    getMenuRecommendation: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const recommendation = await MenuRecommendationService.getMenuRecommendationById(id)
            res.send({
                status: "success",
                recommendation
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el menuRecommendation"
            })
        }
    },

    createMenuRecommendation: async (req: Request<TMenuRecommendation>, res: Response) => {
        const { breakfast, brunch, lunch, afternoon_snack, dinner, image_url, professional_id } = req.body

        try {
            const recommendation = await MenuRecommendationService.createMenuRecommendation({
                breakfast,
                brunch,
                lunch,
                afternoon_snack,
                dinner,
                image_url,
                professional_id 
            })

            res.send({
                status: "success",
                recommendation
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el menuRecommendation"
            })
        }
    },

    updateMenuRecommendation: async (req: Request<TMenuRecommendation, { id: string }>, res: Response) => {
        const { id } = req.params
        try {

            const recommendation = await MenuRecommendationService.updateMenuRecommendation({ _id: id, ...req.body})

            if (!recommendation) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el menuRecommendation"
                })
            }

            res.send({
                status: "success",
                recommendation
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el menuRecommendation"
            })
        }

    },

    deleteMenuRecommendation: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {
            const recommendation = await MenuRecommendationService.deleteMenuRecommendation(id)

            if (!recommendation) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el menuRecommendation"
                })
            }

            return res.send({
                status: "success",
                recommendation
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el menuRecommendation"
            })
        }

    },
}

export default MenuRecommendationController
