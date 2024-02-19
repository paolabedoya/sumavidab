import { Router } from 'express'
import contactController from '../controllers/contact'

const contactRouter = Router()

contactRouter.get("/", contactController.getContacts)
contactRouter.get("/:id", contactController.getContact)
contactRouter.post("/", contactController.createContact)
contactRouter.put("/:id", contactController.updateContact)
contactRouter.delete("/:id", contactController.deleteContact)

export default contactRouter