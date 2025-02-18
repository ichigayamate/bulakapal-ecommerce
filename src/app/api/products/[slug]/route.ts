import ProductModel from "@models/product";
import customError, {NotFoundError} from "@scripts/api/custom-error";

export async function GET(request: Request, {params}: { params: Promise<{ slug: string }> }) {
  try {
    const {slug} = await params;

    const product = await ProductModel.getProductbySlug(slug);
    if (!product) throw new NotFoundError(`Product "${slug}" is not found`);

    return Response.json(product);
  } catch (e) {
    return customError(e as Error);
  }
}