import { Request, Response } from 'express'
import Group from '../models/group'

const groupController = {
    getGroups: async (req: Request, res: Response) => {
        try {
            const groups = await Group.find()
            res.send({
                status: "success",
                groups
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los groups"
            })
        }
    },

    getGroup: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const group = await Group.findById(id)
            res.send({
                status: "success",
                group
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el group"
            })
        }
    },

    createGroup: async (req: Request, res: Response) => {
        const { name } = req.body

        try {
            const newGroup = new Group({ name })

            const resultDocument = await newGroup.save()

            res.send({
                status: "success",
                group: resultDocument
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el group"
            })
        }
    },

    updateGroup: async (req: Request, res: Response) => {
        const { id } = req.params
        const { name } = req.body

        try {

            const group = await Group.findById(id)

            if (!group) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el group"
                })
            }

            group.name = name
            group.updatedAt = new Date()

            const resultDocument = await group.save()

            res.send({
                status: "success",
                group: resultDocument
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el group"
            })
        }

    },

    deleteGroup: async (req: Request, res: Response) => {
        const { id } = req.params

        try {

            const group = await Group.findOneAndDelete({ _id: id })

            if (!group) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el group"
                })
            }

            return res.send({
                status: "success",
                group
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el group"
            })
        }

    },
}

export default groupController