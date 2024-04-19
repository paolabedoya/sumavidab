import Lifestyle from './lifestyle.model'
import type { Lifestyle as TLifestyle } from '../utils/types'

const LifestyleService = {
  getAllLifestyles: async (): Promise<TLifestyle[]> => {
    return Lifestyle.find()
  },
  getLifestyleById: async (id: string): Promise<TLifestyle | null> => {
    return Lifestyle.findById(id)
  },
  createLifestyle: async ({ name }: { name: string }): Promise<TLifestyle> => {
    return new Lifestyle({ name }).save()
  },
  updateLifestyle: async ({ id, name }: { id: string, name: string }): Promise<TLifestyle | null> => {
    return Lifestyle.findOneAndUpdate({ _id: id }, { name, updatedAt: new Date() }, { new: true })
  },
  deleteLifestyle: async (id: string): Promise<TLifestyle | null> => {
    return Lifestyle.findByIdAndDelete(id)
  }
}

export default LifestyleService
