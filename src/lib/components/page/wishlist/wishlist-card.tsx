"use client"

import Link from "next/link";
import price from "@scripts/price-string";
import Modal from "@components/modal";
import {useState} from "react";
import {Wishlist} from "@interfaces/wishlist";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

export default function WishlistCard({data}: Readonly<{ data: Wishlist }>) {
  const [deleteModal, setDeleteModal] = useState(false);
  const handleRemoveWishlist = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  return <>
    <div className="relative">
      <Link href={`/products/${data.product.slug}`} className="absolute w-full h-full">

      </Link>
      <figure className="relative min-w-full aspect-square">
        <img
          src={data.product.thumbnail}
          alt="Test"
        />
        <div className="absolute top-2 right-2 z-10">
          <button className="btn btn-circle btn-sm" onClick={() => setDeleteModal(true)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </figure>
      <div className="flex flex-col">
        <div className="flex-1 mt-2">
          <h3 className="font-bold">{data.product.name}</h3>
          <p>{data.product.excerpt}</p>
        </div>
        <div className="mt-4">
          <p>{price(data.product.price)}</p>
        </div>
      </div>
    </div>

    <Modal
      isOpen={deleteModal}
      onClose={() => setDeleteModal(false)}
      title={`Remove ${data.product.name} from your wishlist`}
      description=""
      onConfirm={handleRemoveWishlist}
      confirmText="Remove"
      confirmButtonClassName="btn-error text-white"
    />
  </>
}