import MedicalHistoryController from "../medicalHistory.controller";
import MedicalHistoryService from "../medicalHistory.service";

jest.mock("../medicalHistory.service.ts", () => ({
  getAllMedicalHistories: jest.fn(),
  getMedicalHistoryById: jest.fn(),
  createMedicalHistory: jest.fn(),
  updateMedicalHistory: jest.fn(),
  deleteMedicalHistory: jest.fn(),
}));

describe("Testing ~ MedicalHistoryController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("MedicalHistoryController ~ getMedicalHistories", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (
        MedicalHistoryService.getAllMedicalHistories as jest.Mock
      ).mockResolvedValue([]);

      await MedicalHistoryController.getMedicalHistories(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (
        MedicalHistoryService.getAllMedicalHistories as jest.Mock
      ).mockRejectedValue(new Error());
      await MedicalHistoryController.getMedicalHistories(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("MedicalHistoryController ~ getMedicalHistory", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (
        MedicalHistoryService.getMedicalHistoryById as jest.Mock
      ).mockResolvedValue({
        id,
      });

      await MedicalHistoryController.getMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the medicalHistory is not found", async () => {
      (
        MedicalHistoryService.getMedicalHistoryById as jest.Mock
      ).mockResolvedValue(null);

      await MedicalHistoryController.getMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (
        MedicalHistoryService.getMedicalHistoryById as jest.Mock
      ).mockRejectedValue({});

      await MedicalHistoryController.getMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("MedicalHistoryController ~ createMedicalHistory", () => {
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

    it("creates an medicalHistory with a valid body", async () => {
      (
        MedicalHistoryService.createMedicalHistory as jest.Mock
      ).mockImplementation(({ patient_id, appointment_id }) => ({
        _id: id,
        patient_id: 2,
        appointment_id: 4,
      }));

      await MedicalHistoryController.createMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (
        MedicalHistoryService.createMedicalHistory as jest.Mock
      ).mockRejectedValue({});

      await MedicalHistoryController.createMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("MedicalHistoryController ~ updateMedicalHistory", () => {
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

    it("updates an medicalHistory with a valid body", async () => {
      (
        MedicalHistoryService.updateMedicalHistory as jest.Mock
      ).mockImplementation(({ _id, patient_id, appointment_id }) => ({
        _id,
        patient_id,
        appointment_id,
      }));

      await MedicalHistoryController.updateMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the medicalHistory", async () => {
      (
        MedicalHistoryService.updateMedicalHistory as jest.Mock
      ).mockResolvedValue(null);

      await MedicalHistoryController.updateMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (
        MedicalHistoryService.updateMedicalHistory as jest.Mock
      ).mockRejectedValue({});

      await MedicalHistoryController.updateMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("MedicalHistoryController ~ deleteMedicalHistory", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an medicalHistory with an existing id", async () => {
      (
        MedicalHistoryService.deleteMedicalHistory as jest.Mock
      ).mockImplementation((id) => ({
        _id: id,
        patient_id: 2,
        appointment_id: 4,
      }));

      await MedicalHistoryController.deleteMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the medicalHistory", async () => {
      (
        MedicalHistoryService.deleteMedicalHistory as jest.Mock
      ).mockResolvedValue(null);

      await MedicalHistoryController.deleteMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (
        MedicalHistoryService.deleteMedicalHistory as jest.Mock
      ).mockRejectedValue({});

      await MedicalHistoryController.deleteMedicalHistory(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
