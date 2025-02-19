import {jwtVerify, SignJWT} from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export type Payload = {
  _id: string;
  email: string;
}

export async function signToken(payload: Payload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, SECRET);
  return payload as Payload;
}