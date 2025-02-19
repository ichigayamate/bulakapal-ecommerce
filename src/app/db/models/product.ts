import database from "@/app/db/config";
import {PaginatedData} from "@interfaces/api";
import {Products} from "@interfaces/products";

/**
 * ProductModel class
 */
export default class ProductModel {
  static readonly collection = database.collection("products");

  /**
   * Get all products
   */
  static async getProducts(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const data = await this.collection.find().skip(skip).limit(limit).toArray() as Products[];
    const total = await this.collection.countDocuments();

    const paginatedData: PaginatedData<Products> = {
      data,
      page,
      limit,
      total
    }

    return paginatedData
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