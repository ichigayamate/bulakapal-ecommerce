"use server";

import {revalidatePath} from "next/cache";

export async function deleteWishlistItem(id: string): Promise<void> {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((res) => {
    if (res.ok) {
      revalidatePath("/", "layout");
    }
  }).catch((err) => {
    throw new Error(err);
  });
}