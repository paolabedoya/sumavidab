import { Router } from 'express'
import userController from '../controllers/user'

const userRouter = Router()

// CRUD operations
userRouter.get("/", userController.getUsers)
userRouter.get("/:id", userController.getUser)
userRouter.post("/", userController.createUser)
userRouter.put("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

// Authentication
userRouter.post("/login", userController.login)

export default userRouter