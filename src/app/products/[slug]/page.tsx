import {notFound} from "next/navigation";
import {type Products} from "@interfaces/products";
import {Metadata} from "next";
import price from "@scripts/price-string";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faTruck} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import WishlistButton from "@components/page/products/wishlist-button-productdetail";

type ProductPageParams = {
  slug: string
}

export async function generateMetadata({params}: Readonly<{ params: Promise<ProductPageParams> }>): Promise<Metadata> {
  const slug = (await params).slug
  const data: Products & {
    code?: number
  } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`)
    .then(res => res.json());
  if (data.code === 404) return {}
  return {
    title: data.name,
    description: data.description
  }
}

export default async function ProductDetailPage({params}: Readonly<{
  params: Promise<{ slug: string }>
}>) {
  const slug = (await params).slug
  const data: Products & {
    code?: number
  } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`)
    .then(res => res.json());
  if (data.code === 404) return notFound();

  return (<>
      <section className="flex flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-2 gap-2">
            {data.images.map((image, i) => (
              <img key={i} src={image} alt={data.name} className="w-full h-64 object-cover"/>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="sticky top-40">
            <h1 className="font-bold text-xl">{data.name}</h1>
            <p>{data.excerpt}</p>
            <div className="mt-8 mb-12">
              <p className="font-light text-xl">{price(data.price)}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <button className="btn btn-neutral flex-1">Buy now</button>
                <WishlistButton id={data._id.toString()} />
              </div>
              <p className="font-light">Estimated delivery:<br/>
                {dayjs().add(4, "days").format("DD MMM YYYY")} - {dayjs().add(8, "days").format("DD MMM YYYY")}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-12 space-y-2">
        <div className="border-b border-b-neutral-300 p-4 rounded-none">
          <h2 className="text-xl font-light uppercase mb-4">Product details</h2>
          <p>{data.description}</p>
        </div>
        <div className="collapse collapse-arrow border-b border-b-neutral-300 rounded-none">
          <input type="checkbox"/>
          <div className="collapse-title text-xl font-light uppercase">Delivery</div>
          <div className="collapse-content">
            <p>
              <FontAwesomeIcon
                icon={faTruck}
                size="sm"
                className="mr-2"
              /> Estimated {dayjs().add(4, "days").format("DD MMM YYYY")} - {dayjs().add(8, "days").format("DD MMM YYYY")}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}