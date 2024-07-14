import ContactController from "../contact.controller";
import ContactService from "../contact.service";

jest.mock("../contact.service.ts", () => ({
  getAllContacts: jest.fn(),
  getContactById: jest.fn(),
  createContact: jest.fn(),
  updateContact: jest.fn(),
  deleteContact: jest.fn(),
}));

describe("Testing ~ ContactController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("ContactController ~ getContacts", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (ContactService.getAllContacts as jest.Mock).mockResolvedValue([]);

      await ContactController.getContacts(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (ContactService.getAllContacts as jest.Mock).mockRejectedValue(
        new Error(),
      );
      await ContactController.getContacts(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("ContactController ~ getContact", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (ContactService.getContactById as jest.Mock).mockResolvedValue({
        id,
      });

      await ContactController.getContact(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the contact is not found", async () => {
      (ContactService.getContactById as jest.Mock).mockResolvedValue(null);

      await ContactController.getContact(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (ContactService.getContactById as jest.Mock).mockRejectedValue({});

      await ContactController.getContact(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("ContactController ~ createContact", () => {
    const id = 100;
    const createBody = {
      name: "contact_name1",
    };
    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an contact with a valid body", async () => {
      (ContactService.createContact as jest.Mock).mockImplementation(
        ({ name }) => ({ _id: id, name }),
      );

      await ContactController.createContact(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (ContactService.createContact as jest.Mock).mockRejectedValue({});

      await ContactController.createContact(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("ContactController ~ updateContact", () => {
    const id = 100;

    const updateBody = {
      name: "contact_name2",
    };

    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an contact with a valid body", async () => {
      (ContactService.updateContact as jest.Mock).mockImplementation(
        ({ _id, name }) => ({ _id, name }),
      );

      await ContactController.updateContact(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the contact", async () => {
      (ContactService.updateContact as jest.Mock).mockResolvedValue(null);

      await ContactController.updateContact(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (ContactService.updateContact as jest.Mock).mockRejectedValue({});

      await ContactController.updateContact(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("ContactController ~ deleteContact", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an contact with an existing id", async () => {
      (ContactService.deleteContact as jest.Mock).mockImplementation((id) => ({
        _id: id,
        name: "contact_name3",
      }));

      await ContactController.deleteContact(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the contact", async () => {
      (ContactService.deleteContact as jest.Mock).mockResolvedValue(null);

      await ContactController.deleteContact(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (ContactService.deleteContact as jest.Mock).mockRejectedValue({});

      await ContactController.deleteContact(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
