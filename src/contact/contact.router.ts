import { Router } from 'express'
import ContactController from './contact.controller'

const ContactRouter = Router()

ContactRouter.get("/contact/", ContactController.getContacts)
ContactRouter.get("/contact/:id", ContactController.getContact)
ContactRouter.post("/contact/", ContactController.createContact)
ContactRouter.put("/contact/:id", ContactController.updateContact)
ContactRouter.delete("/contact/:id", ContactController.deleteContact)

export default ContactRouter
