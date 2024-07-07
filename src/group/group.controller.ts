import { Response } from "express";
import Group from "./group.model";
import type { Request } from "../utils/types";
import type { Group as TGroup } from "../utils/types";
import GroupService from "./group.service";

const GroupController = {
  getGroups: async (_req: Request, res: Response) => {
    try {
      const groups = await GroupService.getAllGroups();

      return res.send(groups);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getGroup: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const group = await GroupService.getGroupById({ _id: id });

      if (!group) return res.status(404).send();

      return res.send(group);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createGroup: async (req: Request<TGroup>, res: Response) => {
    const { name } = req.body;

    try {
      const group = await GroupService.createGroup({ name });

      return res.status(201).send(group);
    } catch (err) {
      return res.send({
        status: "failed",
        message: "No se ha podido crear el group",
      });
    }
  },

  updateGroup: async (req: Request<TGroup, { id: string }>, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const group = await GroupService.updateGroup({ _id: id, name });

      if (!group) return res.status(404).send();

      return res.send(group);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteGroup: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const group = await GroupService.deleteGroup(id);

      if (!group) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default GroupController;
