import { Response } from 'express'
import Group from './group.model'
import type { Request } from '../utils/types'
import type { Group as TGroup } from '../utils/types'
import GroupService from './group.service'

const GroupController = {
    getGroups: async (_req: Request, res: Response) => {
        try {
            const groups = await GroupService.getAllGroups()
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

    getGroup: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const group = await GroupService.getGroupById({ _id: id })
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

    createGroup: async (req: Request<TGroup>, res: Response) => {
        const { name } = req.body

        try {
            const group = await GroupService.createGroup({ name })
            res.send({
                status: "success",
                group
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el group"
            })
        }
    },

    updateGroup: async (req: Request<TGroup, { id: string }>, res: Response) => {
        const { id } = req.params
        const { name } = req.body

        try {
            const group = await GroupService.updateGroup({ _id: id, name })

            if (!group) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el group"
                })
            }

            res.send({
                status: "success",
                group
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el group"
            })
        }

    },

    deleteGroup: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {

            const group = await GroupService.deleteGroup(id)

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

export default GroupController
