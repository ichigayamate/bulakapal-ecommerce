import Link from "next/link";
import {cookies} from "next/headers";
import {Wishlist} from "@interfaces/wishlist";
import WishlistCard from "@components/page/wishlist/wishlist-card";

export default async function Page() {
  const cookie = await cookies();
  const auth = cookie.get("authorization");

  if (!auth) return <>
    <h1 className="font-bold text-2xl">Wishlist</h1>
    <p>Looking for your wishlist? Sign in to see your favourite items</p>
    <Link href="/login" className="btn btn-sm mt-4">Login</Link>
  </>

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`, {
    headers: {
      "Cookie": `authorization=${auth.value}`
    }
  });
  const wishlist: Wishlist[] = await res.json();

  return <>
    <h1 className="font-bold text-2xl">Wishlist</h1>
    <p>Here are your wishlists</p>

    <div className="mt-4 grid grid-cols-5 gap-4">
      {wishlist.map(item => <WishlistCard data={item} key={item._id} />)}
    </div>
  </>
}