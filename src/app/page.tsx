import Link from "next/link";
import ProductCard from "@components/page/products/products-card";
import {Products} from "@interfaces/products";
import {PaginatedData} from "@interfaces/api";
import Image from "next/image";

export default async function Home() {
  const allProducts = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=1&limit=5`)
    .then(res => res.json())
    .then((data: PaginatedData<Products>) => data.data);

  return (
    <>
      <div className="mb-8 flex lg:flex-row-reverse">
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <Image
            src="https://pollinations.ai/p/any%20image%20located%20in%20shopping%20mall?width=750&height=750&seed=1802&nologo=true&model=flux"
            alt="Banner" width={500} height={500}/>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome to Bulakapal</h1>
            <p>Where you can find all of your needs</p>
          </div>
          <Link href="/products" className="btn">Shop now</Link>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <h2 className="font-bold">Recommended</h2>
        <Link href="/products" className="btn btn-sm">Shop all products</Link>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {allProducts.map((product) => (
          <ProductCard data={product} key={String(product._id)}/>
        ))}
      </div>
    </>
  );
}
