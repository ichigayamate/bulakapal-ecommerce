import customError, {UnauthorizedError} from "@scripts/api/custom-error";
import UserModel from "@models/user";
import {comparePassword} from "@scripts/api/bcrypt";
import {signToken} from "@scripts/api/jwt";

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

    return Response.json({message: "Login success", token});
  } catch (e) {
    return customError(e as Error);
  }
}