import { Response } from 'express'
import type { Request } from '../utils/types'
import type { Contact as TContact } from '../utils/types'
import Contact from './contact.model'
import ContactService from './contact.service'

const contactController = {
    getContacts: async (_req: Request, res: Response) => {
        try {
            const contacts = await ContactService.getAllContacts()
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
            const contact = await ContactService.getContactById(id)
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
        try {
            const contact = await ContactService.createContact({ ...req.body })

            res.send({
                status: "success",
                contact
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el contact"
            })
        }
    },

    updateContact: async (req: Request<TContact, { id: string }>, res: Response) => {
        try {

            const contact = await ContactService.updateContact({ _id: req.params.id, req.body })

            if (!contact) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el contact"
                })
            }

            res.send({
                status: "success",
                contact
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el contact"
            })
        }

    },

    deleteContact: async (req: Request<any, { id: string }>, res: Response) => {
        try {

            const contact = await ContactService.deleteContact(req.params.id)

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
