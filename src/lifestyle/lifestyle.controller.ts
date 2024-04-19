import { Response } from 'express'
import Lifestyle from './lifestyle.model'
import type { Request } from '../utils/types'
import type { Lifestyle as TLifestyle } from '../utils/types'
import LifestyleService from './lifestyle.service'

const LifestyleController = {
    getLifestyles: async (_req: Request, res: Response) => {
        try {
            const lifestyles = await LifestyleService.getAllLifestyles()
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
            const lifestyle = await LifestyleService.getLifestyleById(id)
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
            const lifestyle = await LifestyleService.createLifestyle({ name })
            res.send({
                status: "success",
                lifestyle
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

            const lifestyle = await LifestyleService.updateLifestyle({ id, name })

            if (!lifestyle) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el lifestyle"
                })
            }

            res.send({
                status: "success",
                lifestyle
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
            const lifestyle = await LifestyleService.deleteLifestyle(id)

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

export default LifestyleController
