import GroupController from "../group.controller";
import GroupService from "../group.service";

jest.mock("../group.service.ts", () => ({
  getAllGroups: jest.fn(),
  getGroupById: jest.fn(),
  createGroup: jest.fn(),
  updateGroup: jest.fn(),
  deleteGroup: jest.fn(),
}));

describe.only("Testing ~ GroupController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("GroupController ~ getGroups", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (GroupService.getAllGroups as jest.Mock).mockResolvedValue([]);

      await GroupController.getGroups(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (GroupService.getAllGroups as jest.Mock).mockRejectedValue(new Error());
      await GroupController.getGroups(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("GroupController ~ getGroup", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (GroupService.getGroupById as jest.Mock).mockResolvedValue({
        id,
      });

      await GroupController.getGroup(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the group is not found", async () => {
      (GroupService.getGroupById as jest.Mock).mockResolvedValue(null);

      await GroupController.getGroup(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (GroupService.getGroupById as jest.Mock).mockRejectedValue({});

      await GroupController.getGroup(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("GroupController ~ createGroup", () => {
    const id = 100;

    const createBody = {
      name: "group_name1",
    };

    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an group with a valid body", async () => {
      (GroupService.createGroup as jest.Mock).mockImplementation(
        ({ name }) => ({
          _id: id,
          name,
        }),
      );

      await GroupController.createGroup(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (GroupService.createGroup as jest.Mock).mockRejectedValue({});

      await GroupController.createGroup(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("GroupController ~ updateGroup", () => {
    const id = 100;

    const updateBody = {
      name: "group_name2",
    };

    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an group with a valid body", async () => {
      (GroupService.updateGroup as jest.Mock).mockImplementation(
        ({ _id, name }) => ({ _id, name }),
      );

      await GroupController.updateGroup(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the group", async () => {
      (GroupService.updateGroup as jest.Mock).mockResolvedValue(null);

      await GroupController.updateGroup(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (GroupService.updateGroup as jest.Mock).mockRejectedValue({});

      await GroupController.updateGroup(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("GroupController ~ deleteGroup", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an group with an existing id", async () => {
      (GroupService.deleteGroup as jest.Mock).mockImplementation((id) => ({
        _id: id,
        name: "group_name3",
      }));

      await GroupController.deleteGroup(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the group", async () => {
      (GroupService.deleteGroup as jest.Mock).mockResolvedValue(null);

      await GroupController.deleteGroup(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (GroupService.deleteGroup as jest.Mock).mockRejectedValue({});

      await GroupController.deleteGroup(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
