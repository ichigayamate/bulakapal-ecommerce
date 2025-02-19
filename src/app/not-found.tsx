"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import toast from "react-hot-toast";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    toast.error("Page not found");
    router.push("/");
  })

  return <></>
}