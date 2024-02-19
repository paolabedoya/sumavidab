import { Request, Response } from 'express'
import Country from '../models/country'

const countryController = {
    getCountries: async (req: Request, res: Response) => {
        try {
            const countries = await Country.find()
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

    getCountry: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const country = await Country.findById(id)
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

    createCountry: async (req: Request, res: Response) => {
        const { name } = req.body

        try {
            const newCountry = new Country({
                name
            })

            const resultDocument = await newCountry.save()

            res.send({
                status: "success",
                country: resultDocument
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el country"
            })
        }
    },

    updateCountry: async (req: Request, res: Response) => {
        const { id } = req.params
        const { name } = req.body

        try {

            const country = await Country.findById(id)

            if (!country) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el country"
                })
            }

            country.name = name
            country.updatedAt = new Date()

            const resultDocument = await country.save()

            res.send({
                status: "success",
                country: resultDocument
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el country"
            })
        }

    },

    deleteCountry: async (req: Request, res: Response) => {
        const { id } = req.params

        try {

            const country = await Country.findOneAndDelete({ _id: id })

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

export default countryController