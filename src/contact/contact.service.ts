import Contact from './contact.model'
import type { Contact as TContact } from '../utils/types'

const ContactService = {
  getAllContacts: async (): Promise<TContact[]> => {
    return Contact.find()
  },
  getContactById: async (id: string): Promise<TContact | null> => {
    return Contact.findById(id)
  },
  createContact: async (contact: Partial<TContact>): Promise<TContact> => {
    return new Contact({ ...contact }).save()
  },
  updateContact: async (contact: Partial<TContact>): Promise<TContact | null> => {
    return Contact.findOneAndUpdate({ _id: contact._id }, { ...contact }, { new: true })
  },
  deleteContact: async (id: string): Promise<TContact | null> => {
    return Contact.findByIdAndDelete(id)
  }
}

export default ContactService
