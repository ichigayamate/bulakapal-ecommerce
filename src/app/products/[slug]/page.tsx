import {notFound} from "next/navigation";

export default async function ProductDetailPage({params}: Readonly<{
  params: Promise<{ slug: string }>
}>) {
  const slug = (await params).slug
  const data = await fetch(`http://localhost:3000/api/products/${slug}`)
    .then(res => res.json());
  if (data.code === 404) return notFound();

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>{slug}</p>
    </div>
  )
}