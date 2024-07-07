import { Response } from "express";
import MedicalHistory from "./medicalHistory.model";
import type { Request } from "../utils/types";
import type { MedicalHistory as TMedicalHistory } from "../utils/types";
import MedicalHistoryService from "./medicalHistory.service";

const MedicalHistoryController = {
  getMedicalHistories: async (_req: Request, res: Response) => {
    try {
      const medicalHistories =
        await MedicalHistoryService.getAllMedicalHistories();

      return res.send(medicalHistories);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getMedicalHistory: async (
    req: Request<any, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;
    try {
      const medicalHistory =
        await MedicalHistoryService.getMedicalHistoryById(id);

      if (!medicalHistory) return res.status(404).send();

      return res.send(medicalHistory);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createMedicalHistory: async (
    req: Request<TMedicalHistory>,
    res: Response,
  ) => {
    const { patient_id, appointment_id } = req.body;

    try {
      const medicalHistory = await MedicalHistoryService.createMedicalHistory({
        patient_id,
        appointment_id,
      });

      return res.status(201).send(medicalHistory);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateMedicalHistory: async (
    req: Request<TMedicalHistory, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;
    const { patient_id, appointment_id } = req.body;

    try {
      const medicalHistory = await MedicalHistoryService.updateMedicalHistory({
        _id: id,
        patient_id,
        appointment_id,
      });

      if (!medicalHistory) return res.status(404).send();

      return res.send(medicalHistory);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteMedicalHistory: async (
    req: Request<any, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;

    try {
      const medicalHistory =
        await MedicalHistoryService.deleteMedicalHistory(id);

      if (!medicalHistory) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default MedicalHistoryController;
