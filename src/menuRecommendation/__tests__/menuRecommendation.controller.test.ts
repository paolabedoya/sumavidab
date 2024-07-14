import MenuRecommendationController from "../menuRecommendation.controller";
import MenuRecommendationService from "../menuRecommendation.service";

jest.mock("../menuRecommendation.service.ts", () => ({
  getAllMenuRecommendations: jest.fn(),
  getMenuRecommendationById: jest.fn(),
  createMenuRecommendation: jest.fn(),
  updateMenuRecommendation: jest.fn(),
  deleteMenuRecommendation: jest.fn(),
}));

describe("Testing ~ MenuRecommendationController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("MenuRecommendationController ~ getMenuRecommendations", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (
        MenuRecommendationService.getAllMenuRecommendations as jest.Mock
      ).mockResolvedValue([]);

      await MenuRecommendationController.getMenuRecommendations(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (
        MenuRecommendationService.getAllMenuRecommendations as jest.Mock
      ).mockRejectedValue(new Error());
      await MenuRecommendationController.getMenuRecommendations(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("MenuRecommendationController ~ getMenuRecommendation", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (
        MenuRecommendationService.getMenuRecommendationById as jest.Mock
      ).mockResolvedValue({
        id,
      });

      await MenuRecommendationController.getMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the menuRecommendation is not found", async () => {
      (
        MenuRecommendationService.getMenuRecommendationById as jest.Mock
      ).mockResolvedValue(null);

      await MenuRecommendationController.getMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (
        MenuRecommendationService.getMenuRecommendationById as jest.Mock
      ).mockRejectedValue({});

      await MenuRecommendationController.getMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("MenuRecommendationController ~ createMenuRecommendation", () => {
    const id = 100;

    const createBody = {
      patient_id: 2,
      appointment_id: 4,
    };

    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an menuRecommendation with a valid body", async () => {
      (
        MenuRecommendationService.createMenuRecommendation as jest.Mock
      ).mockImplementation(({ patient_id, appointment_id }) => ({
        _id: id,
        patient_id: 2,
        appointment_id: 4,
      }));

      await MenuRecommendationController.createMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (
        MenuRecommendationService.createMenuRecommendation as jest.Mock
      ).mockRejectedValue({});

      await MenuRecommendationController.createMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("MenuRecommendationController ~ updateMenuRecommendation", () => {
    const id = 100;

    const updateBody = {
      patient_id: 2,
      appointment_id: 4,
    };

    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an menuRecommendation with a valid body", async () => {
      (
        MenuRecommendationService.updateMenuRecommendation as jest.Mock
      ).mockImplementation(({ _id, patient_id, appointment_id }) => ({
        _id,
        patient_id,
        appointment_id,
      }));

      await MenuRecommendationController.updateMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the menuRecommendation", async () => {
      (
        MenuRecommendationService.updateMenuRecommendation as jest.Mock
      ).mockResolvedValue(null);

      await MenuRecommendationController.updateMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (
        MenuRecommendationService.updateMenuRecommendation as jest.Mock
      ).mockRejectedValue({});

      await MenuRecommendationController.updateMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("MenuRecommendationController ~ deleteMenuRecommendation", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an menuRecommendation with an existing id", async () => {
      (
        MenuRecommendationService.deleteMenuRecommendation as jest.Mock
      ).mockImplementation((id) => ({
        _id: id,
        patient_id: 2,
        appointment_id: 4,
      }));

      await MenuRecommendationController.deleteMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the menuRecommendation", async () => {
      (
        MenuRecommendationService.deleteMenuRecommendation as jest.Mock
      ).mockResolvedValue(null);

      await MenuRecommendationController.deleteMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (
        MenuRecommendationService.deleteMenuRecommendation as jest.Mock
      ).mockRejectedValue({});

      await MenuRecommendationController.deleteMenuRecommendation(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
