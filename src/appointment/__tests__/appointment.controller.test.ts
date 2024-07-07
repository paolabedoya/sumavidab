import AppointmentController from "../appointment.controller";
import AppointmentService from "../appointment.service";

jest.mock("../appointment.service.ts", () => ({
  getAllAppointments: jest.fn(),
  getAppointmentById: jest.fn(),
  createAppointment: jest.fn(),
  updateAppointment: jest.fn(),
  deleteAppointment: jest.fn(),
}));

describe("Testing ~ AppointmentController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("AppointmentController ~ getAppointments", () => {
    beforeAll(() => {
      req = {};
    });
    it("returns an empty array when the request works", async () => {
      (AppointmentService.getAllAppointments as jest.Mock).mockResolvedValue(
        [],
      );

      await AppointmentController.getAppointments(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });
    it("returns a 500 error when the request fails", async () => {
      (AppointmentService.getAllAppointments as jest.Mock).mockRejectedValue(
        new Error(),
      );
      await AppointmentController.getAppointments(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("AppointmentController ~ getAppointment", () => {
    const id = 100;
    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (AppointmentService.getAppointmentById as jest.Mock).mockResolvedValue({
        id,
      });

      await AppointmentController.getAppointment(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the appointment is not found", async () => {
      (AppointmentService.getAppointmentById as jest.Mock).mockResolvedValue(
        undefined,
      );

      await AppointmentController.getAppointment(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (AppointmentService.getAppointmentById as jest.Mock).mockRejectedValue(
        {},
      );

      await AppointmentController.getAppointment(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("AppointmentController ~ createAppointment", () => {
    const id = 100;
    const createBody = {
      type: "type1",
      appointment_id: id,
    };
    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an appointment with a valid body", async () => {
      (AppointmentService.createAppointment as jest.Mock).mockImplementation(
        ({ type, appointment_id }) => ({ _id: id, type, appointment_id }),
      );

      await AppointmentController.createAppointment(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (AppointmentService.createAppointment as jest.Mock).mockRejectedValue({});

      await AppointmentController.createAppointment(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("AppointmentController ~ updateAppointment", () => {
    const id = 100;
    const updateBody = {
      type: "type2",
      appointment_id: id,
    };
    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an appointment with a valid body", async () => {
      (AppointmentService.updateAppointment as jest.Mock).mockImplementation(
        ({ _id, type, appointment_id }) => ({ _id, type, appointment_id }),
      );

      await AppointmentController.updateAppointment(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the appointment", async () => {
      (AppointmentService.updateAppointment as jest.Mock).mockResolvedValue(
        null,
      );

      await AppointmentController.updateAppointment(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (AppointmentService.updateAppointment as jest.Mock).mockRejectedValue({});

      await AppointmentController.updateAppointment(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("AppointmentController ~ deleteAppointment", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an appointment with an existing id", async () => {
      (AppointmentService.deleteAppointment as jest.Mock).mockImplementation(
        (id) => ({ _id: id, type: "type2", appointment_id: 2 }),
      );

      await AppointmentController.deleteAppointment(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the appointment", async () => {
      (AppointmentService.deleteAppointment as jest.Mock).mockResolvedValue(
        null,
      );

      await AppointmentController.deleteAppointment(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (AppointmentService.deleteAppointment as jest.Mock).mockRejectedValue({});

      await AppointmentController.deleteAppointment(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
