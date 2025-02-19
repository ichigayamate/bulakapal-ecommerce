import {sign} from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: {
  _id: string;
  email: string;
}): string {
  return sign(payload, SECRET);
}