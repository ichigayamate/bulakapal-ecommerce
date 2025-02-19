import Link from "next/link";

export default async function Page() {
  return <>
    <h1 className="font-bold text-2xl">Wishlist</h1>
    <p>Looking for your wishlist? Sign in to see your favourite items</p>
    <Link href="/login" className="btn btn-sm mt-4">Login</Link>
  </>
}