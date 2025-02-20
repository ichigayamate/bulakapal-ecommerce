import database from "@/app/db/config";
import {ObjectId} from "mongodb";

export default class WishlistModel {
  static readonly collection = database.collection("wishlists");

  static async getWishlist(user: string) {
    const userId = ObjectId.createFromHexString(user);
    return await this.collection.find({userId}).toArray();
  }

  static async createWishlist(user: string, product: string) {
    const userId = ObjectId.createFromHexString(user);
    const productId = ObjectId.createFromHexString(product);
    return await this.collection.insertOne({userId, productId});
  }

  static async deleteWishlist(_id: ObjectId) {
    return await this.collection.deleteOne({_id});
  }
}