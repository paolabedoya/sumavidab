import User from "./user.model";
import { User as TUser } from "../utils/types";

const UserService = {
  getAllUsers: async (): Promise<TUser[]> => {
    return await User.find();
  },
  getUserById: async ({ id }: { id: string }): Promise<TUser | null> => {
    return await User.findById(id);
  },
  getUserByEmail: async (email: string): Promise<TUser | null> => {
    return await User.findOne({ email });
  },
  createUser: async (user: Partial<TUser>): Promise<TUser> => {
    return await new User({ ...user }).save();
  },
  updateUser: async (user: Partial<TUser>): Promise<TUser | null> => {
    return await User.findOneAndUpdate(
      { _id: user._id },
      { ...user },
      { new: true },
    );
  },
  deleteUser: async (id: string): Promise<TUser | null> => {
    const user = await User.findByIdAndDelete(id);
    return user;
  },
};

export default UserService;
