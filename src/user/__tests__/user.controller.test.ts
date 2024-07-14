import UserController from "../user.controller";
import UserService from "../user.service";

jest.mock("../user.service.ts", () => ({
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

describe("Testing ~ UserController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("UserController ~ getUsers", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (UserService.getAllUsers as jest.Mock).mockResolvedValue([]);

      await UserController.getUsers(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (UserService.getAllUsers as jest.Mock).mockRejectedValue(new Error());
      await UserController.getUsers(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("UserController ~ getUser", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (UserService.getUserById as jest.Mock).mockResolvedValue({
        id,
      });

      await UserController.getUser(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the user is not found", async () => {
      (UserService.getUserById as jest.Mock).mockResolvedValue(null);

      await UserController.getUser(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (UserService.getUserById as jest.Mock).mockRejectedValue({});

      await UserController.getUser(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("UserController ~ createUser", () => {
    const id = 100;

    const createBody = {
      name: "user_name1",
    };

    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an recipd with a valid body", async () => {
      (UserService.createUser as jest.Mock).mockImplementation(({ name }) => ({
        _id: id,
        name,
      }));

      await UserController.createUser(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (UserService.createUser as jest.Mock).mockRejectedValue({});

      await UserController.createUser(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("UserController ~ updateUser", () => {
    const id = 100;

    const updateBody = {
      name: "user_name2",
    };

    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an user with a valid body", async () => {
      (UserService.updateUser as jest.Mock).mockImplementation(
        ({ _id, name }) => ({ _id, name }),
      );

      await UserController.updateUser(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the user", async () => {
      (UserService.updateUser as jest.Mock).mockResolvedValue(null);

      await UserController.updateUser(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (UserService.updateUser as jest.Mock).mockRejectedValue({});

      await UserController.updateUser(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("UserController ~ deleteUser", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an user with an existing id", async () => {
      (UserService.deleteUser as jest.Mock).mockImplementation((id) => ({
        _id: id,
        name: "user_name3",
      }));

      await UserController.deleteUser(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the user", async () => {
      (UserService.deleteUser as jest.Mock).mockResolvedValue(null);

      await UserController.deleteUser(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (UserService.deleteUser as jest.Mock).mockRejectedValue({});

      await UserController.deleteUser(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
