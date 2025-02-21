"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function WishlistButton({id}: Readonly<{ id: string }>) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addToWishlist = async () => {
    setLoading(true);

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
    }).finally(() => setLoading(false));
    await toast.promise(res, {
      loading: "Adding to Wishlist",
      success: "Added to Wishlist",
      error: (err) => {
        const message = (err as Error).message;
        if (message === "Unauthorized") {
          router.push("/login");
          return "Please login first";
        } else if (message === "Product already in wishlist") {
          return `This product is already in your wishlist`;
        } else {
          return message;
        }
      },
    })
  }

  return <button className="btn btn-outline" title="Add to Wishlist" onClick={addToWishlist} disabled={loading}>
    <FontAwesomeIcon icon={loading ? faSpinner : faHeart} spin={loading} />
  </button>
}