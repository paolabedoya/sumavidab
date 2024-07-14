import JobController from "../job.controller";
import JobService from "../job.service";

jest.mock("../job.service.ts", () => ({
  getAllJobs: jest.fn(),
  getJobById: jest.fn(),
  createJob: jest.fn(),
  updateJob: jest.fn(),
  deleteJob: jest.fn(),
}));

describe("Testing ~ JobController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("JobController ~ getJobs", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (JobService.getAllJobs as jest.Mock).mockResolvedValue([]);

      await JobController.getJobs(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (JobService.getAllJobs as jest.Mock).mockRejectedValue(new Error());
      await JobController.getJobs(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("JobController ~ getJob", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (JobService.getJobById as jest.Mock).mockResolvedValue({
        id,
      });

      await JobController.getJob(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the job is not found", async () => {
      (JobService.getJobById as jest.Mock).mockResolvedValue(null);

      await JobController.getJob(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (JobService.getJobById as jest.Mock).mockRejectedValue({});

      await JobController.getJob(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("JobController ~ createJob", () => {
    const id = 100;

    const createBody = {
      name: "job_name1",
    };

    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an job with a valid body", async () => {
      (JobService.createJob as jest.Mock).mockImplementation(({ name }) => ({
        _id: id,
        name,
      }));

      await JobController.createJob(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (JobService.createJob as jest.Mock).mockRejectedValue({});

      await JobController.createJob(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("JobController ~ updateJob", () => {
    const id = 100;

    const updateBody = {
      name: "job_name2",
    };

    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an job with a valid body", async () => {
      (JobService.updateJob as jest.Mock).mockImplementation(
        ({ _id, name }) => ({ _id, name }),
      );

      await JobController.updateJob(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the job", async () => {
      (JobService.updateJob as jest.Mock).mockResolvedValue(null);

      await JobController.updateJob(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (JobService.updateJob as jest.Mock).mockRejectedValue({});

      await JobController.updateJob(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("JobController ~ deleteJob", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an job with an existing id", async () => {
      (JobService.deleteJob as jest.Mock).mockImplementation((id) => ({
        _id: id,
        name: "job_name3",
      }));

      await JobController.deleteJob(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the job", async () => {
      (JobService.deleteJob as jest.Mock).mockResolvedValue(null);

      await JobController.deleteJob(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (JobService.deleteJob as jest.Mock).mockRejectedValue({});

      await JobController.deleteJob(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
