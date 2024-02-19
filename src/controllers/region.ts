import { Request, Response } from 'express'
import Region from '../models/region'

const regionController = {
    getRegions: async (req: Request, res: Response) => {
        try {
            const regions = await Region.find()
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

    getRegion: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const region = await Region.findById(id)
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

    createRegion: async (req: Request, res: Response) => {
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

    updateRegion: async (req: Request, res: Response) => {
        const { id } = req.params
        const { name } = req.body

        try {
            const region = await Region.findById(id)

            if (!region) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el region"
                })
            }

            region.name = name
            region.updatedAt = new Date()

            const resultDocument = await region.save()

            res.send({
                status: "success",
                region: resultDocument
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el region"
            })
        }
    },

    deleteRegion: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const region = await Region.findOneAndDelete({ _id: id })

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

export default regionController