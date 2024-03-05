import { Response } from 'express'
import User from '../models/user'
import type { Request, User as TUser } from '../utils/types'

const userController = {
    getUsers: async (_req: Request, res: Response) => {
        try {
            const users = await User.find()
            res.send({
                status: "success",
                users: users
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los usuarios"
            })
        }
    },

    getUser: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const user = await User.findById(id)
            res.send({
                status: "success",
                user
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el usuario"
            })
        }
    },

    createUser: async (req: Request<TUser>, res: Response) => {
        const { rol, job_id, active, country_id, region, gender, group_id, lifestyle_id, events } = req.body

        try {
            const newUser = new User({
                rol,
                job_id,
                active,
                country_id,
                region,
                gender,
                group_id,
                lifestyle_id,
                events
            })

            const resultDocument = await newUser.save()

            res.send({
                status: "success",
                user: resultDocument
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el usuario"
            })
        }
    },

    updateUser: async (req: Request<TUser, { id: string }>, res: Response) => {
        const { id } = req.params
        const { rol, job_id, active, country_id, region, gender, group_id, lifestyle_id, events } = req.body

        try {
            const user = await User.findById(id)

            if (!user) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el usuario"
                })
            }

            user.rol = rol
            user.job_id = job_id
            user.active = active
            user.country_id = country_id
            user.region = region
            user.gender = gender
            user.group_id = group_id
            user.lifestyle_id = lifestyle_id
            user.events = events
            user.updatedAt = new Date()

            const resultDocument = await user.save()

            res.send({
                status: "success",
                user: resultDocument
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el usuario"
            })
        }

    },

    deleteUser: async (req: Request<unknown, { id: string }>, res: Response) => {
        const { id } = req.params

        try {

            const user = await User.findOneAndDelete({ _id: id })

            if (!user) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el usuario"
                })
            }

            return res.send({
                status: "success",
                user
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el usuario"
            })
        }

    },

    login: async (req: Request, res: Response) => {
    }
}

export default userController