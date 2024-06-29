import AppointmentController from "../appointment.controller";
import AppointmentService from "../appointment.service";

jest.mock("../appointment.service.ts", () => ({
  getAllAppointments: jest.fn(),
  getAppointmentById: jest.fn(),
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
});
