import {Products} from "@interfaces/products";

export type Wishlist = {
  _id: string;
  userId: string;
  productId: string;
  product: Products;
  createdAt: Date;
  updatedAt: Date;
}