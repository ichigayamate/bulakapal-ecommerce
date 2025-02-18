"use client";

import Wishlistbutton from "@components/page/products/wishlist-button";
import {Products} from "@interfaces/products";
import Link from "next/link";
import price from "@scripts/price-string";

export default function ProductCard({data}: Readonly<{ data: Products }>) {
  const handleWishlist = async () => {
    return null
  }

  return <div className="relative">
    <Link href={`/products/${data.slug}`} className="absolute w-full h-full">

    </Link>
    <figure className="relative min-w-full">
      <img
        src={data.thumbnail}
        alt="Test"
      />
      <div className="absolute top-2 right-2 z-10">
        <Wishlistbutton onClick={handleWishlist}/>
      </div>
    </figure>
    <div className="flex flex-col">
      <div className="flex-1 mt-2">
        <h3 className="font-bold">{data.name}</h3>
        <p>{data.excerpt}</p>
      </div>
      <div className="mt-4">
        <p>{price(data.price)}</p>
      </div>
    </div>
  </div>
}