"use client";

import {FieldValues, useForm} from "react-hook-form";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function NavbarSearch() {
  const {register, handleSubmit, setValue} = useForm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSubmit = (data: FieldValues) => {
    router.push(`/products?search=${data.search}`);
  };

  useEffect(() => {
    if (pathname === "/products") {
      setValue("search", searchParams.get("search") || "");
    }
  }, [pathname, searchParams, setValue])

  return <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("search")} type="search" className="input input-bordered input-sm"/>
  </form>
}