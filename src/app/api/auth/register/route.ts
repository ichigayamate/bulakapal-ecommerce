import customError from "@scripts/api/custom-error";
import UserModel from "@models/user";

export async function POST(request: Request) {
  try {
    const user = await request.json();
    console.log(user);
    await UserModel.create(user);

    return Response.json({message: "User created"}, {status: 201});
  } catch (e) {
    return customError(e as Error);
  }
}