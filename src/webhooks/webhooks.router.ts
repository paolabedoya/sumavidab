import { Router } from "express";
import userService from "../user/user.service";

const WebhookRouter = Router();

WebhookRouter.post("/auth0/register", async (req: any, res) => {
  const user = req.body?.data;

  if (!user) {
    return res.status(404).send();
  }
  console.log("user: ", user);

  try {
    const exists = await userService.getUserByEmail(user.email);

    if (exists) return res.status(304);

    await userService.createUser({
      ...user,
      fullName: user.name ?? user.username,
    });

    return res.status(201).send();
  } catch (error) {
    console.log("error creating the user in the webhook: ", error);
  }
});

export default WebhookRouter;
