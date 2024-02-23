import { Response } from 'express'
import Lifestyle from '../models/lifestyle'
import type { Request } from '../utils/types'
import type { Lifestyle as TLifestyle } from '../utils/types'

const lifestyleController = {
    getLifestyles: async (_req: Request, res: Response) => {
        try {
            const lifestyles = await Lifestyle.find()
            res.send({
                status: "success",
                lifestyles
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los lifestyle"
            })
        }
    },

    getLifestyle: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const lifestyle = await Lifestyle.findById(id)
            res.send({
                status: "success",
                lifestyle
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el lifestyle"
            })
        }
    },

    createLifestyle: async (req: Request<TLifestyle>, res: Response) => {
        const { name } = req.body

        try {
            const newLifestyle = new Lifestyle({
                name
            })

            const resultDocument = await newLifestyle.save()

            res.send({
                status: "success",
                lifestyle: resultDocument
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el lifestyle"
            })
        }
    },

    updateLifestyle: async (req: Request<TLifestyle, { id: string }>, res: Response) => {
        const { id } = req.params
        const { name } = req.body

        try {

            const lifestyle = await Lifestyle.findById(id)

            if (!lifestyle) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el lifestyle"
                })
            }

            lifestyle.name = name
            lifestyle.updatedAt = new Date()

            const resultDocument = await lifestyle.save()

            res.send({
                status: "success",
                lifestyle: resultDocument
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el lifestyle"
            })
        }

    },

    deleteLifestyle: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {

            const lifestyle = await Lifestyle.findOneAndDelete({ _id: id })

            if (!lifestyle) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el lifestyle"
                })
            }

            return res.send({
                status: "success",
                lifestyle
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el lifestyle"
            })
        }

    },
}

export default lifestyleController