import { Response } from "express";
import Event from "./event.model";
import type { Request } from "../utils/types";
import type { Event as TEvent } from "../utils/types";
import EventService from "./event.service";

const EventController = {
  getEvents: async (_req: Request, res: Response) => {
    try {
      const events = await EventService.getAllEvents();

      return res.send(events);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getEvent: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const event = await EventService.getEventById(id);

      if (!event) return res.status(404).send();

      return res.send(event);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createEvent: async (req: Request<TEvent>, res: Response) => {
    try {
      const event = EventService.createEvent(req.body);

      return res.status(201).send(event);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateEvent: async (req: Request<TEvent, { id: string }>, res: Response) => {
    try {
      const event = await EventService.updateEvent({
        _id: req.params.id,
        ...req.body,
      });

      if (!event) return res.status(404).send();

      return res.send(event);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteEvent: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const event = await EventService.deleteEvent(id);

      if (!event) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default EventController;
