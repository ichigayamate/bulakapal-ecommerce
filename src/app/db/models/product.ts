import database from "@/app/db/config";
import {PaginatedData} from "@interfaces/api";
import {Products} from "@interfaces/products";
import {Filter} from "mongodb";

/**
 * ProductModel class
 */
export default class ProductModel {
  static readonly collection = database.collection("products");

  /**
   * Get all products
   *
   * @param page
   * @param limit
   * @param search
   * @param tags
   */
  static async getProducts(page: number = 1, limit: number = 10, search?: string, tags?: string) {
    const skip = (page - 1) * limit;
    const query: {
      name?: Filter<string>;
      tags?: Filter<string>;
    } = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    const data = await this.collection.find(query).skip(skip).limit(limit).toArray() as Products[];
    const total = await this.collection.countDocuments(query);

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