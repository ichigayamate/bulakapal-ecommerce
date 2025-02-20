import customError, {UnauthorizedError} from "@scripts/api/custom-error";
import UserModel from "@models/user";
import {comparePassword} from "@scripts/api/bcrypt";
import {signToken} from "@scripts/api/jwt";
import {cookies} from "next/headers";

export async function POST(request: Request) {
  try {
    const {email, password} = await request.json();

    const user = await UserModel.findByEmail(email);
    if (!user) throw new UnauthorizedError("Invalid email/password");

    const isValid = comparePassword(password, user.password);
    if (!isValid) throw new UnauthorizedError("Invalid email/password");

    const token = await signToken({
      _id: user._id.toString(),
      email: user.email
    });

    const cookieStore = await cookies();
    cookieStore.set("authorization", `Bearer ${token}`);

    return Response.json({message: "Login success", token});
  } catch (e) {
    return customError(e as Error);
  }
}