import EventController from "../event.controller";
import EventService from "../event.service";

jest.mock("../event.service.ts", () => ({
  getAllEvents: jest.fn(),
  getEventById: jest.fn(),
  createEvent: jest.fn(),
  updateEvent: jest.fn(),
  deleteEvent: jest.fn(),
}));

describe("Testing ~ EventController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("EventController ~ getEvents", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (EventService.getAllEvents as jest.Mock).mockResolvedValue([]);

      await EventController.getEvents(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (EventService.getAllEvents as jest.Mock).mockRejectedValue(new Error());
      await EventController.getEvents(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("EventController ~ getEvent", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (EventService.getEventById as jest.Mock).mockResolvedValue({
        id,
      });

      await EventController.getEvent(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the event is not found", async () => {
      (EventService.getEventById as jest.Mock).mockResolvedValue(null);

      await EventController.getEvent(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (EventService.getEventById as jest.Mock).mockRejectedValue({});

      await EventController.getEvent(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("EventController ~ createEvent", () => {
    const id = 100;

    const createBody = {
      name: "event_name1",
    };

    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an event with a valid body", async () => {
      (EventService.createEvent as jest.Mock).mockImplementation(
        ({ name }) => ({ _id: id, name }),
      );

      await EventController.createEvent(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (EventService.createEvent as jest.Mock).mockRejectedValue({});

      await EventController.createEvent(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("EventController ~ updateEvent", () => {
    const id = 100;

    const updateBody = {
      name: "event_name2",
    };

    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an event with a valid body", async () => {
      (EventService.updateEvent as jest.Mock).mockImplementation(
        ({ _id, name }) => ({ _id, name }),
      );

      await EventController.updateEvent(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the event", async () => {
      (EventService.updateEvent as jest.Mock).mockResolvedValue(null);

      await EventController.updateEvent(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (EventService.updateEvent as jest.Mock).mockRejectedValue({});

      await EventController.updateEvent(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("EventController ~ deleteEvent", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an event with an existing id", async () => {
      (EventService.deleteEvent as jest.Mock).mockImplementation((id) => ({
        _id: id,
        name: "event_name3",
      }));

      await EventController.deleteEvent(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the event", async () => {
      (EventService.deleteEvent as jest.Mock).mockResolvedValue(null);

      await EventController.deleteEvent(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (EventService.deleteEvent as jest.Mock).mockRejectedValue({});

      await EventController.deleteEvent(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
