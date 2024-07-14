import { Response } from "express";
import User from "./user.model";
import type { Request, User as TUser } from "../utils/types";
import UserService from "./user.service";

const userController = {
  getUsers: async (_req: Request, res: Response) => {
    try {
      const users = await UserService.getAllUsers();

      return res.send(users);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getUser: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById({ id });

      if (!user) return res.status(404).send();

      return res.send(user);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createUser: async (req: Request<TUser>, res: Response) => {
    try {
      const user = await UserService.createUser({ ...req.body });

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateUser: async (req: Request<TUser, { id: string }>, res: Response) => {
    const { id: _id } = req.params;

    try {
      const user = await UserService.updateUser({ _id, ...req.body });

      if (!user) return res.status(404).send();

      return res.send(user);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteUser: async (req: Request<unknown, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const user = await UserService.deleteUser(id);

      if (!user) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default userController;
