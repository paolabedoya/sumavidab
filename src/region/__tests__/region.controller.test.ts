import RegionController from "../region.controller";
import RegionService from "../region.service";

jest.mock("../region.service.ts", () => ({
  getAllRegions: jest.fn(),
  getRegionById: jest.fn(),
  createRegion: jest.fn(),
  updateRegion: jest.fn(),
  deleteRegion: jest.fn(),
}));

describe("Testing ~ RegionController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("RegionController ~ getRegions", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (RegionService.getAllRegions as jest.Mock).mockResolvedValue([]);

      await RegionController.getRegions(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (RegionService.getAllRegions as jest.Mock).mockRejectedValue(new Error());
      await RegionController.getRegions(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("RegionController ~ getRegion", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (RegionService.getRegionById as jest.Mock).mockResolvedValue({
        id,
      });

      await RegionController.getRegion(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the region is not found", async () => {
      (RegionService.getRegionById as jest.Mock).mockResolvedValue(null);

      await RegionController.getRegion(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (RegionService.getRegionById as jest.Mock).mockRejectedValue({});

      await RegionController.getRegion(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("RegionController ~ createRegion", () => {
    const id = 100;

    const createBody = {
      name: "region_name1",
    };

    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an recipd with a valid body", async () => {
      (RegionService.createRegion as jest.Mock).mockImplementation(
        ({ name }) => ({
          _id: id,
          name,
        }),
      );

      await RegionController.createRegion(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (RegionService.createRegion as jest.Mock).mockRejectedValue({});

      await RegionController.createRegion(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("RegionController ~ updateRegion", () => {
    const id = 100;

    const updateBody = {
      name: "region_name2",
    };

    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an region with a valid body", async () => {
      (RegionService.updateRegion as jest.Mock).mockImplementation(
        ({ _id, name }) => ({ _id, name }),
      );

      await RegionController.updateRegion(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the region", async () => {
      (RegionService.updateRegion as jest.Mock).mockResolvedValue(null);

      await RegionController.updateRegion(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (RegionService.updateRegion as jest.Mock).mockRejectedValue({});

      await RegionController.updateRegion(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("RegionController ~ deleteRegion", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an region with an existing id", async () => {
      (RegionService.deleteRegion as jest.Mock).mockImplementation((id) => ({
        _id: id,
        name: "region_name3",
      }));

      await RegionController.deleteRegion(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the region", async () => {
      (RegionService.deleteRegion as jest.Mock).mockResolvedValue(null);

      await RegionController.deleteRegion(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (RegionService.deleteRegion as jest.Mock).mockRejectedValue({});

      await RegionController.deleteRegion(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
