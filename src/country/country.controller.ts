import { Response } from 'express'
import type { Request } from '../utils/types'
import type { Country as TCountry } from '../utils/types'
import CountryService from './country.service'

const CountryController = {
    getCountries: async (_req: Request, res: Response) => {
        try {
            const countries = await CountryService.getAllCountries()
            res.send({
                status: "success",
                countries
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los countries"
            })
        }
    },

    getCountry: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const country = await CountryService.getCountryById(id)
            res.send({
                status: "success",
                country
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el country"
            })
        }
    },

    createCountry: async (req: Request<TCountry>, res: Response) => {
        const { name } = req.body

        try {
            const country = await CountryService.createCountry({ name })

            res.send({
                status: "success",
                country
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el country"
            })
        }
    },

    updateCountry: async (req: Request<TCountry, { id: string }>, res: Response) => {
        const { id } = req.params
        const { name } = req.body

        try {

            const country = await CountryService.updateCountry({ id, name })

            if (!country) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el country"
                })
            }

            res.send({
                status: "success",
                country
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el country"
            })
        }

    },

    deleteCountry: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {
            const country = await CountryService.deleteCountry(id)

            if (!country) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el country"
                })
            }

            return res.send({
                status: "success",
                country
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el country"
            })
        }

    },
}

export default CountryController
