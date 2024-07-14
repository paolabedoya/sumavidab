import { Response } from "express";
import type { Request } from "../utils/types";
import type { Contact as TContact } from "../utils/types";
import ContactService from "./contact.service";

const contactController = {
  getContacts: async (_req: Request, res: Response) => {
    try {
      const contacts = await ContactService.getAllContacts();
      return res.send(contacts);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getContact: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const contact = await ContactService.getContactById(id);
      if (!contact) return res.status(404).send();

      return res.send(contact);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createContact: async (req: Request<TContact>, res: Response) => {
    try {
      const contact = await ContactService.createContact({ ...req.body });

      return res.status(201).send(contact);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateContact: async (
    req: Request<TContact, { id: string }>,
    res: Response,
  ) => {
    try {
      const contact = await ContactService.updateContact({
        _id: req.params.id,
        ...req.body,
      });

      if (!contact) {
        return res.status(404).send();
      }

      return res.send(contact);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteContact: async (req: Request<any, { id: string }>, res: Response) => {
    try {
      const contact = await ContactService.deleteContact(req.params.id);

      if (!contact) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default contactController;
