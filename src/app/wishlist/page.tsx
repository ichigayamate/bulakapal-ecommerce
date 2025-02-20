import Link from "next/link";
import {cookies} from "next/headers";

export default async function Page() {
  const cookie = await cookies();
  const auth = cookie.get("authorization");

  if (!auth) return <>
    <h1 className="font-bold text-2xl">Wishlist</h1>
    <p>Looking for your wishlist? Sign in to see your favourite items</p>
    <Link href="/login" className="btn btn-sm mt-4">Login</Link>
  </>

  return <>
    <h1 className="font-bold text-2xl">Wishlist</h1>
    <p>Wishlist items</p>
  </>
}