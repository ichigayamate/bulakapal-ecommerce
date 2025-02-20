import ProductModel from "@models/product";
import {Products} from "@interfaces/products";
import {PaginatedData} from "@interfaces/api";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);
  const search = url.searchParams.get("search") ?? "";
  const tags = url.searchParams.get("tags") ?? "";

  const products: PaginatedData<Products> = await ProductModel.getProducts(page, limit, search, tags);
  return Response.json(products);
}