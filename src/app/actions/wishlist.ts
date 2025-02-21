"use server";

import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

export async function deleteWishlistItem(id: string): Promise<void> {
  const auth = (await cookies()).get("authorization")?.value;

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `authorization=${auth}`
    },
    body: JSON.stringify({ id }),
  }).then(async (res) => {
    console.log(res);
    if (res.ok) {
      revalidatePath("/", "layout");
      return await res.json();
    }
    const response = await res.json();
    throw response.message;
  }).catch((err) => {
    throw new Error(err);
  });
}