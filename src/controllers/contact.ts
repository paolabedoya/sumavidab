import { Response } from 'express'
import type { Request } from '../utils/types'
import type { Contact as TContact } from '../utils/types'
import Contact from '../models/contact'

const contactController = {
    getContacts: async (_req: Request, res: Response) => {
        try {
            const contacts = await Contact.find()
            res.send({
                status: "success",
                contacts
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los contacts"
            })
        }
    },

    getContact: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const contact = await Contact.findById(id)
            res.send({
                status: "success",
                contact
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el contact"
            })
        }
    },

    createContact: async (req: Request<TContact>, res: Response) => {
        const { name, phone, email, message } = req.body

        try {
            const newContact = new Contact({
                name,
                phone,
                email,
                message
            })

            const resultDocument = await newContact.save()

            res.send({
                status: "success",
                contact: resultDocument
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el contact"
            })
        }
    },

    updateContact: async (req: Request<TContact, { id: string }>, res: Response) => {
        const { id } = req.params
        const { name, email, phone, message } = req.body

        try {

            const contact = await Contact.findById(id)

            if (!contact) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el contact"
                })
            }

            contact.name = name
            contact.email = email
            contact.phone = phone
            contact.message = message
            contact.updatedAt = new Date()

            const resultDocument = await contact.save()

            res.send({
                status: "success",
                contact: resultDocument
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el contact"
            })
        }

    },

    deleteContact: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {

            const contact = await Contact.findOneAndDelete({ _id: id })

            if (!contact) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el contact"
                })
            }

            return res.send({
                status: "success",
                contact
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el contact"
            })
        }

    },
}

export default contactController