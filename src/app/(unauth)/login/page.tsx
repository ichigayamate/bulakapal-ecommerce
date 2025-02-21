"use client";

import {FieldValues, useForm} from "react-hook-form";
import Input from "@components/form/input-form";
import Link from "next/link";
import toast from "react-hot-toast";
import {HTTPError} from "@interfaces/api";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage() {
  const {control, handleSubmit} = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (data: FieldValues) => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(async (res) => {
      if (!res.ok) {
        const data: HTTPError = await res.json();
        toast.error(data.message);
        return
      }
      toast.success("Success login");
      router.refresh();
    }).finally(() => {
      setLoading(false);
    })
  }

  return <div>
    <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4">
      <label className="form-control">
        <div className="label">
          <span className="label-text">Email address</span>
        </div>
        <Input name="email" type="email" required control={control}/>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <Input name="password" type="password" required control={control}/>
      </label>
      <div className="mt-4">
        <button type="submit" className="w-full btn btn-neutral" disabled={loading}>
          {loading && <span className="loading loading-spinner"></span>} Log in
        </button>
      </div>
    </form>
    <div className="mt-4 text-center">
      <p>New to Bulakapal? <Link href="/register" className="link">Register</Link></p>
    </div>
  </div>
}