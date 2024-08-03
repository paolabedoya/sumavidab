import express from "express";

const AuthController = {
  authorize: (req: express.Request, res: express.Response) => {
    if (req.auth) {
      return res.send("Authorized");
    }
    return res.status(401).send("Unaurhorized request");
  },
};

export { AuthController };
