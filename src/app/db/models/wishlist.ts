import database from "@/app/db/config";
import {ObjectId} from "mongodb";
import {BadRequestError, ConflictError, NotFoundError} from "@scripts/api/custom-error";

export default class WishlistModel {
  static readonly collection = database.collection("wishlists");

  static async getWishlist(user: string) {
    const userId = ObjectId.createFromHexString(user);
    return await this.collection.aggregate([{
      $match: {userId}
    }, {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product"
      },
    }, {
      $unwind: "$product"
    }]).toArray();
  }

  static async createWishlist(user: string, product: string) {
    if (!product) throw new BadRequestError("Product ID (as in product) is required");
    const userId = ObjectId.createFromHexString(user);
    const productId = ObjectId.createFromHexString(product);

    const isProductExist = await database.collection("products").findOne({_id: productId});
    if (!isProductExist) throw new NotFoundError("Product not found");

    const existing = await this.collection.findOne({userId, productId});
    if (existing) throw new ConflictError("Product already in wishlist");

    return await this.collection.insertOne({
      userId,
      productId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  static async deleteWishlist(_id: ObjectId) {
    const existing = await this.collection.findOne({_id});
    if (!existing) throw new NotFoundError("Wishlist not found");

    return await this.collection.deleteOne({_id});
  }
}