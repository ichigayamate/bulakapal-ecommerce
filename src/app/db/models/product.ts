import database from "@/app/db/config";
import {Products} from "@interfaces/products";
import {ObjectId, WithId} from "mongodb";

/**
 * ProductModel class
 */
export default class ProductModel {
  static readonly collection = database.collection("products");

  /**
   * Get all products
   */
  static async getProducts() {
    return await this.collection.find().toArray();
  }

  /**
   * Get product by slug
   *
   * @param slug
   */
  static async getProductbySlug(slug: string) {
    return await this.collection.findOne({ slug });
  }
}