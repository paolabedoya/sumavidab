import type { Group as TGroup } from "../utils/types"
import Group from "./group.model"


const GroupService = {
  getAllGroups: async (): Promise<TGroup[]> => {
    return Group.find()
  },
  getGroupById: async ({ _id }: Partial<TGroup>): Promise<TGroup | null> => {
    return Group.findById(_id)
  },
  createGroup: async ({ name }: Partial<TGroup>): Promise<TGroup | null> => {
    return new Group({ name }).save()
  },
  updateGroup: async ({ _id, name }: Partial<TGroup>): Promise<TGroup | null> => {
    return Group.findOneAndUpdate({ _id }, { name, updatedAt: new Date() }, { new: true })
  },
  deleteGroup: async (_id: string): Promise<TGroup | null> => {
    return Group.findByIdAndDelete(_id)
  }
}

export default GroupService
