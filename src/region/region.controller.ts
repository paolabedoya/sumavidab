import { Response } from 'express'
import Region from './region.model'
import type { Request } from '../utils/types'
import type { Region as TRegion } from '../utils/types'
import RegionService from './region.service'

const RegionController = {
    getRegions: async (_req: Request, res: Response) => {
        try {
            const regions = await RegionService.getAllRegions()
            res.send({
                status: "success",
                regions
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los regions"
            })
        }
    },

    getRegion: async (req: Request<unknown, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const region = await RegionService.getRegionById({ id })
            res.send({
                status: "success",
                region
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el region"
            })
        }
    },

    createRegion: async (req: Request<TRegion>, res: Response) => {
        const { name } = req.body

        try {
            const newRegion = new Region({ name })

            const resultDocument = await newRegion.save()

            res.send({
                status: "success",
                region: resultDocument
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el region"
            })
        }
    },

    updateRegion: async (req: Request<TRegion, { id: string }>, res: Response) => {
        const { id } = req.params
        const { name } = req.body

        try {
            const region = await RegionService.updateRegion({ id, name })

            if (!region) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el region"
                })
            }
            res.send({
                status: "success",
                region
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el region"
            })
        }
    },

    deleteRegion: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {
            const region = await RegionService.deleteRegion(id)

            if (!region) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el region"
                })
            }
            return res.send({
                status: "success",
                region
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el region"
            })
        }
    },
}

export default RegionController