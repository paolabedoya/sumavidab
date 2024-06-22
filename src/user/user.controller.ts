import { Response } from "express";
import User from "./user.model";
import type { Request, User as TUser } from "../utils/types";
import UserService from "./user.service";

const userController = {
  getUsers: async (_req: Request, res: Response) => {
    try {
      const users = await UserService.getAllUsers();
      res.send({
        status: "success",
        users: users,
      });
    } catch (err) {
      return res.send({
        status: "failed",
        message: "No se ha podido obtener los usuarios",
      });
    }
  },

  getUser: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById({ id });
      res.send({
        status: "success",
        user,
      });
    } catch (err) {
      return res.send({
        status: "failed",
        message: "No se ha podido obtener el usuario",
      });
    }
  },

  createUser: async (req: Request<TUser>, res: Response) => {
    try {
      const user = await UserService.createUser({ ...req.body });

      res.send({
        status: "success",
        user,
      });
    } catch (err) {
      return res.send({
        status: "failed",
        message: "No se ha podido crear el usuario",
      });
    }
  },

  updateUser: async (req: Request<TUser, { id: string }>, res: Response) => {
    const { id } = req.params;
    const {
      rol,
      job_id,
      active,
      country_id,
      region,
      gender,
      group_id,
      lifestyle_id,
      events,
    } = req.body;

    try {
      const user = await UserService.updateUser({ ...req.body });

      if (!user) {
        return res.send({
          status: "failed",
          message: "No se ha encontrado el usuario",
        });
      }

      res.send({
        status: "success",
        user,
      });
    } catch (err) {
      return res.send({
        status: "failed",
        message: "No se ha podido actualizar el usuario",
      });
    }
  },

  deleteUser: async (req: Request<unknown, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const user = await UserService.deleteUser(id);

      if (!user) {
        return res.send({
          status: "failed",
          message: "No se ha encontrado el usuario",
        });
      }

      return res.send({
        status: "success",
        user,
      });
    } catch (err) {
      return res.send({
        status: "failed",
        message: "No se ha podido eliminar el usuario",
      });
    }
  },

  login: async (req: Request, res: Response) => {},
};

export default userController;
