"use client";

import WishlistButton from "@components/page/products/wishlist-button";
import {Products} from "@interfaces/products";
import Link from "next/link";
import price from "@scripts/price-string";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProductCard({data}: Readonly<{ data: Products }>) {
  const router = useRouter();
  const handleWishlist = async () => {
    const id = data._id;
    const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({product: id}),
    }).then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      const data = await res.json();
      throw new Error(data.message);
    })
    await toast.promise(res, {
      loading: "Adding to Wishlist",
      success: "Added to Wishlist",
      error: (err) => {
        const message = (err as Error).message;
        if (message === "Unauthorized") {
          router.push("/login");
          return "Please login first";
        } else if (message === "Product already in wishlist") {
          return `Product ${data.name} is already in your wishlist`;
        } else {
          return message;
        }
      },
    })
  }

  return <div className="relative">
    <Link href={`/products/${data.slug}`} className="absolute w-full h-full">

    </Link>
    <figure className="relative min-w-full aspect-square">
      <img
        src={data.thumbnail}
        alt="Test"
      />
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton onClick={handleWishlist}/>
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