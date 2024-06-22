import mongoose, { Schema } from "mongoose";
import type { User as TUser } from "../utils/types";

const UserSchema = new Schema<TUser>({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  fullName: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: ["admin", "patient", "professional"],
    default: "patient",
  },
  job_id: {
    type: Number,
    required: false,
    default: 0,
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  country_id: {
    type: String,
    required: false,
    default: "",
  },
  region: {
    type: String,
    required: false,
    default: "",
  },
  gender: {
    type: String,
    required: false,
    enum: ["f", "m"],
    default: "m",
  },
  group_id: {
    type: String,
    required: false,
    default: "",
  },
  lifestyle_id: {
    type: String,
    required: false,
    default: "",
  },
  events: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
