import Event from "./event.model";
import type { Event as TEvent } from "../utils/types";

const EventService = {
  getAllEvents: async (): Promise<TEvent[]> => {
    return Event.find();
  },
  getEventById: async (id: string): Promise<TEvent | null> => {
    return Event.findById(id);
  },
  createEvent: async ({
    start_date,
    end_date,
    description,
    venue_type,
    worker_id,
  }: Partial<TEvent>): Promise<TEvent> => {
    return new Event({
      start_date,
      end_date,
      description,
      venue_type,
      worker_id,
    }).save();
  },
  updateEvent: async (event: TEvent): Promise<TEvent | null> => {
    return Event.findOneAndUpdate(
      { _id: event._id },
      { ...event, updatedAt: new Date() },
      { new: true },
    );
  },
  deleteEvent: async (id: string): Promise<TEvent | null> => {
    return Event.findByIdAndDelete(id);
  },
};

export default EventService;
