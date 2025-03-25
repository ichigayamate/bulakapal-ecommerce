import {Metadata} from "next";
import AllProducts from "@components/page/products/infinite-scroll-product";

export const metadata: Metadata = {
  title: "All Products",
}

export default async function Page({searchParams}: Readonly<{
  searchParams: Promise<{
    search?: string;
  }>
}>) {
  const searchQuery = (await searchParams)?.search ?? "";
  const initialData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?search=${searchQuery}`).then(res => res.json());

  return <AllProducts initialData={initialData} searchQuery={searchQuery} />
}