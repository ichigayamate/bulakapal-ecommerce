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
    {wishlist.length > 0 ?
      <div className="mt-4 grid grid-cols-5 gap-4">
        {wishlist.map(item => <WishlistCard data={item} key={item._id}/>)}
      </div> :
      <div className="card border border-info-content w-full mt-4">
        <div className="card-body items-center text-center">
          <h2 className="card-title">No wishlist</h2>
          <p>Start shopping and add them to your wishlist</p>
          <div className="card-actions justify-end mt-4 -mb-2">
            <Link className="btn" href="/products">Start shopping</Link>
          </div>
        </div>
      </div>
    }
  </>
}