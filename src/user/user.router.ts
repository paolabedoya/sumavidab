import { Router } from "express";
import UserController from "./user.controller";

const UserRouter = Router();

// CRUD operations
UserRouter.get("/user/", UserController.getUsers);
UserRouter.get("/user/:id", UserController.getUser);
UserRouter.post("/user/", UserController.createUser);
UserRouter.put("/user/:id", UserController.updateUser);
UserRouter.delete("/user/:id", UserController.deleteUser);

// Authentication
UserRouter.post("/user/login", UserController.login);

export default UserRouter;
