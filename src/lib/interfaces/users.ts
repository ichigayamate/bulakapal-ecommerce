import {ObjectId} from "mongodb";
import {z} from "zod";

export interface User {
  _id: ObjectId | string;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NewUser = Omit<User, "_id" | "createdAt" | "updatedAt">;

export const UserSchema = z.object({
  username: z.string({message: "Username is required"}),
  email: z.string({message: "Email is required"}).email({message: "Invalid email format"}),
  password: z.string({message: "Password is required"}).min(5, {message: "Password must be at least 5 characters long"}),
})