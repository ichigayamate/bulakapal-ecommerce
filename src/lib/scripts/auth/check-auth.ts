import {cookies} from "next/headers";

export async function checkAuth() {
  const cookie = await cookies();
  const auth = cookie.get("authorization");
  return Boolean(auth);
}