import Link from "next/link";
import ProductCard from "@components/page/products/products-card";
import {Products} from "@interfaces/products";

export default async function Home() {
  const allProducts: Products[] = await fetch("http://localhost:3000/api/products").then(res => res.json());

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Recommended</h2>
        <Link href="/products" className="btn btn-sm">Shop all products</Link>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {allProducts.map((product, index) => (
          <ProductCard data={product} key={String(product._id)}/>
        ))}
      </div>
    </>
  );
}
