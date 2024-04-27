import MenuRecommendation from './menuRecommendation.model'
import type { MenuRecommendation as TMenuRecommendation } from '../utils/types'

const MenuRecommendationService = {
  getAllMenuRecommendations: async (): Promise<TMenuRecommendation[]> => {
    return MenuRecommendation.find()
  },
  getMenuRecommendationById: async (id: string): Promise<TMenuRecommendation | null> => {
    return MenuRecommendation.findById(id)
  },
  createMenuRecommendation: async (recommendationBody: Partial<TMenuRecommendation>): Promise<TMenuRecommendation> => {
    return new MenuRecommendation({ ...recommendationBody }).save()
  },
  updateMenuRecommendation: async (recommendationBody: Partial<TMenuRecommendation>): Promise<TMenuRecommendation | null> => {
    return MenuRecommendation.findOneAndUpdate({ _id: recommendationBody._id }, { ...recommendationBody }, { new: true })
  },
  deleteMenuRecommendation: async (id: string): Promise<TMenuRecommendation | null> => {
    return MenuRecommendation.findByIdAndDelete(id)
  }
}

export default MenuRecommendationService
