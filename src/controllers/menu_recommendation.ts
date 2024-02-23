import { Response } from 'express'
import MenuRecommendation from '../models/menu_recommendation'
import type { Request } from '../utils/types'
import type { MenuRecommendation as TMenuRecommendation } from '../utils/types'

const menuRecommendationController = {
    getMenuRecommendations: async (_req: Request, res: Response) => {
        try {
            const menuRecommendations = await MenuRecommendation.find()
            res.send({
                status: "success",
                menuRecommendations
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
            const menuRecommendation = await MenuRecommendation.findById(id)
            res.send({
                status: "success",
                menuRecommendation
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
            const newMenuRecommendation = new MenuRecommendation({
                breakfast,
                brunch,
                lunch,
                afternoon_snack,
                dinner,
                image_url,
                professional_id 
            })

            const resultDocument = await newMenuRecommendation.save()

            res.send({
                status: "success",
                menuRecommendation: resultDocument
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
        const { breakfast, brunch, lunch, afternoon_snack, dinner, image_url, professional_id } = req.body

        try {

            const menuRecommendation = await MenuRecommendation.findById(id)

            if (!menuRecommendation) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el menuRecommendation"
                })
            }
            
            menuRecommendation.breakfast = breakfast
            menuRecommendation.brunch = brunch
            menuRecommendation.lunch = lunch
            menuRecommendation.afternoon_snack = afternoon_snack
            menuRecommendation.dinner = dinner
            menuRecommendation.image_url = image_url
            menuRecommendation.professional_id = professional_id
            menuRecommendation.updatedAt = new Date()

            const resultDocument = await menuRecommendation.save()

            res.send({
                status: "success",
                menuRecommendation: resultDocument
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
            const menuRecommendation = await MenuRecommendation.findOneAndDelete({ _id: id })

            if (!menuRecommendation) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el menuRecommendation"
                })
            }

            return res.send({
                status: "success",
                menuRecommendation
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el menuRecommendation"
            })
        }

    },
}

export default menuRecommendationController