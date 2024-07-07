import CountryController from "../country.controller";
import CountryService from "../country.service";

jest.mock("../country.service.ts", () => ({
  getAllCountries: jest.fn(),
  getCountryById: jest.fn(),
  createCountry: jest.fn(),
  updateCountry: jest.fn(),
  deleteCountry: jest.fn(),
}));

describe("Testing ~ CountryController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("CountryController ~ getCountries", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (CountryService.getAllCountries as jest.Mock).mockResolvedValue([]);

      await CountryController.getCountries(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (CountryService.getAllCountries as jest.Mock).mockRejectedValue(
        new Error(),
      );
      await CountryController.getCountries(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("CountryController ~ getCountry", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (CountryService.getCountryById as jest.Mock).mockResolvedValue({
        id,
      });

      await CountryController.getCountry(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the country is not found", async () => {
      (CountryService.getCountryById as jest.Mock).mockResolvedValue(null);

      await CountryController.getCountry(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (CountryService.getCountryById as jest.Mock).mockRejectedValue({});

      await CountryController.getCountry(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("CountryController ~ createCountry", () => {
    const id = 100;

    const createBody = {
      name: "country_name1",
    };

    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an country with a valid body", async () => {
      (CountryService.createCountry as jest.Mock).mockImplementation(
        ({ name }) => ({ _id: id, name }),
      );

      await CountryController.createCountry(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (CountryService.createCountry as jest.Mock).mockRejectedValue({});

      await CountryController.createCountry(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("CountryController ~ updateCountry", () => {
    const id = 100;

    const updateBody = {
      name: "country_name2",
    };

    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an country with a valid body", async () => {
      (CountryService.updateCountry as jest.Mock).mockImplementation(
        ({ _id, name }) => ({ _id, name }),
      );

      await CountryController.updateCountry(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the country", async () => {
      (CountryService.updateCountry as jest.Mock).mockResolvedValue(null);

      await CountryController.updateCountry(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (CountryService.updateCountry as jest.Mock).mockRejectedValue({});

      await CountryController.updateCountry(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("CountryController ~ deleteCountry", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an country with an existing id", async () => {
      (CountryService.deleteCountry as jest.Mock).mockImplementation((id) => ({
        _id: id,
        name: "country_name3",
      }));

      await CountryController.deleteCountry(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the country", async () => {
      (CountryService.deleteCountry as jest.Mock).mockResolvedValue(null);

      await CountryController.deleteCountry(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (CountryService.deleteCountry as jest.Mock).mockRejectedValue({});

      await CountryController.deleteCountry(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
