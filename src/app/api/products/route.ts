import ProductModel from "@models/product";

export async function GET(): Promise<Response> {
  const products = await ProductModel.getProducts();
  return Response.json(products);
}