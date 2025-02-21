import {Metadata} from "next";
import AllProducts from "@components/page/products/infinite-scroll-product";

export const metadata: Metadata = {
  title: "All Products",
}

export default async function Page() {
  const initialData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`).then(res => res.json());

  return <AllProducts initialData={initialData} />
}