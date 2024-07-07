import { Response } from "express";
import type { Request } from "../utils/types";
import type { Appointment as TAppointment } from "../utils/types";
import AppointmentService from "./appointment.service";

const AppointmentController = {
  getAppointments: async (_req: Request, res: Response) => {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      return res.send(appointments);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getAppointment: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const appointment = await AppointmentService.getAppointmentById(id);

      if (!appointment) return res.status(404).send();

      return res.send(appointment);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createAppointment: async (req: Request<TAppointment, any>, res: Response) => {
    const { type, appointment_id } = req.body;

    try {
      const appointment = await AppointmentService.createAppointment({
        type,
        appointment_id,
      });
      res.status(201).send(appointment);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateAppointment: async (
    req: Request<TAppointment, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;
    const { type, appointment_id } = req.body;

    try {
      const appointment = await AppointmentService.updateAppointment({
        _id: id,
        type,
        appointment_id,
      });

      if (!appointment) return res.status(404).send();

      return res.send(appointment);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteAppointment: async (
    req: Request<any, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;

    try {
      const appointment = await AppointmentService.deleteAppointment(id);

      if (!appointment) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default AppointmentController;
