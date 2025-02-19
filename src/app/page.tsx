import Link from "next/link";
import ProductCard from "@components/page/products/products-card";
import {Products} from "@interfaces/products";
import {PaginatedData} from "@interfaces/api";

export default async function Home() {
  const allProducts = await fetch("http://localhost:3000/api/products?page=1&limit=5")
    .then(res => res.json())
    .then((data: PaginatedData<Products>) => data.data);

  return (
    <>
      <div className="mb-4">
        <h1>Welcome to Bulakapal</h1>
        <p>Where you can find all of your needs</p>
        <Link href="/products" className="btn">Shop now</Link>
      </div>

      <div className="flex justify-between mb-4">
        <h2>Recommended</h2>
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
