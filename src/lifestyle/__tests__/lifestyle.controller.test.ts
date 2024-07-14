import LifestyleController from "../lifestyle.controller";
import LifestyleService from "../lifestyle.service";

jest.mock("../lifestyle.service.ts", () => ({
  getAllLifestyles: jest.fn(),
  getLifestyleById: jest.fn(),
  createLifestyle: jest.fn(),
  updateLifestyle: jest.fn(),
  deleteLifestyle: jest.fn(),
}));

describe("Testing ~ LifestyleController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("LifestyleController ~ getLifestyles", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (LifestyleService.getAllLifestyles as jest.Mock).mockResolvedValue([]);

      await LifestyleController.getLifestyles(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (LifestyleService.getAllLifestyles as jest.Mock).mockRejectedValue(
        new Error(),
      );
      await LifestyleController.getLifestyles(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("LifestyleController ~ getLifestyle", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (LifestyleService.getLifestyleById as jest.Mock).mockResolvedValue({
        id,
      });

      await LifestyleController.getLifestyle(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the lifestyle is not found", async () => {
      (LifestyleService.getLifestyleById as jest.Mock).mockResolvedValue(null);

      await LifestyleController.getLifestyle(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (LifestyleService.getLifestyleById as jest.Mock).mockRejectedValue({});

      await LifestyleController.getLifestyle(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("LifestyleController ~ createLifestyle", () => {
    const id = 100;

    const createBody = {
      name: "lifestyle_name1",
    };

    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an lifestyle with a valid body", async () => {
      (LifestyleService.createLifestyle as jest.Mock).mockImplementation(
        ({ name }) => ({
          _id: id,
          name,
        }),
      );

      await LifestyleController.createLifestyle(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (LifestyleService.createLifestyle as jest.Mock).mockRejectedValue({});

      await LifestyleController.createLifestyle(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("LifestyleController ~ updateLifestyle", () => {
    const id = 100;

    const updateBody = {
      name: "lifestyle_name2",
    };

    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an lifestyle with a valid body", async () => {
      (LifestyleService.updateLifestyle as jest.Mock).mockImplementation(
        ({ _id, name }) => ({ _id, name }),
      );

      await LifestyleController.updateLifestyle(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the lifestyle", async () => {
      (LifestyleService.updateLifestyle as jest.Mock).mockResolvedValue(null);

      await LifestyleController.updateLifestyle(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (LifestyleService.updateLifestyle as jest.Mock).mockRejectedValue({});

      await LifestyleController.updateLifestyle(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("LifestyleController ~ deleteLifestyle", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an lifestyle with an existing id", async () => {
      (LifestyleService.deleteLifestyle as jest.Mock).mockImplementation(
        (id) => ({
          _id: id,
          name: "lifestyle_name3",
        }),
      );

      await LifestyleController.deleteLifestyle(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the lifestyle", async () => {
      (LifestyleService.deleteLifestyle as jest.Mock).mockResolvedValue(null);

      await LifestyleController.deleteLifestyle(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (LifestyleService.deleteLifestyle as jest.Mock).mockRejectedValue({});

      await LifestyleController.deleteLifestyle(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
