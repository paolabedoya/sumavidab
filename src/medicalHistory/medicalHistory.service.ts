import MedicalHistory from './medicalHistory.model'
import type { MedicalHistory as TMedicalHistory } from '../utils/types'

const MedicalHistoryService = {
  getAllMedicalHistories: async (): Promise<TMedicalHistory[]> => {
    return MedicalHistory.find()
  },
  getMedicalHistoryById: async (id: string): Promise<TMedicalHistory | null> => {
    return MedicalHistory.findById(id)
  },
  createMedicalHistory: async ({ patient_id, appointment_id }: Partial<TMedicalHistory>): Promise<TMedicalHistory> => {
    return new MedicalHistory({  patient_id, appointment_id  }).save()
  },
  updateMedicalHistory: async ({ _id, patient_id, appointment_id }: Partial<TMedicalHistory>): Promise<TMedicalHistory | null> => {
    return MedicalHistory.findOneAndUpdate({ _id }, { patient_id, appointment_id, updatedAt: new Date() }, { new: true })
  },
  deleteMedicalHistory: async (id: string): Promise<TMedicalHistory | null> => {
    return MedicalHistory.findByIdAndDelete(id)
  }
}

export default MedicalHistoryService
