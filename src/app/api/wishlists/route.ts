import {NextRequest} from "next/server";
import WishlistModel from "@models/wishlist";
import customError, {UnauthorizedError} from "@scripts/api/custom-error";
import {ObjectId} from "mongodb";

export async function GET(request: NextRequest) {
  const user = request.headers.get("x-user-id");
  try {
    if (!user) {
      throw new UnauthorizedError("User is required from token");
    }
    const data = await WishlistModel.getWishlist(user)
    return Response.json(data);
  } catch (e) {
    const error = e as Error;
    return customError(error);
  }
}

export async function POST(request: NextRequest) {
  const user = request.headers.get("x-user-id");
  const {product} = await request.json();
  try {
    if (!user) {
      throw new UnauthorizedError("User is required from token");
    }
    const data = await WishlistModel.createWishlist(user, product);
    return Response.json({message: "Wishlist created", data}, {status: 201});
  } catch (e) {
    const error = e as Error;
    return customError(error);
  }
}

export async function DELETE(request: NextRequest) {
  const user = request.headers.get("x-user-id");
  const {id}: {
    id: string
  } = await request.json();
  try {
    if (!user) {
      throw new UnauthorizedError("User is required from token");
    }
    const _id = ObjectId.createFromHexString(id);
    await WishlistModel.deleteWishlist(_id);
    return Response.json({message: "Wishlist deleted"});
  } catch (e) {
    const error = e as Error;
    return customError(error);
  }
}