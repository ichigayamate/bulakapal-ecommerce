"use client";

import {FieldValues, useForm} from "react-hook-form";
import Input from "@components/form/input-form";
import {useState} from "react";
import {HTTPError} from "@interfaces/api";
import toast from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const {control, handleSubmit} = useForm();
  const router = useRouter();

  const register = async (data: FieldValues) => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(async (res) => {
      if (!res.ok) {
        const data: HTTPError = await res.json();
        if (data.message === "User already exists") {
          setError([]);
          setUserExists(true);
        } else {
          setError(data.message.split(","))
          setUserExists(false);
        }
        return
      }
      toast.success("Success register. Please login");
      router.push("/");
    }).finally(() => {
      setLoading(false);
    })
  }

  return <div>
    <form onSubmit={handleSubmit(register)} className="flex flex-col gap-2">
      {error.length > 0 &&
        <div role="alert" className="alert border border-error bg-transparent">
          <FontAwesomeIcon icon={faExclamationTriangle} className="shrink-0 text-error" />
          <div>
            Form has issues:
            <ol className="list-decimal list-inside mt-2">
              {error.map((err, i) => <li key={i}>{err}</li>)}
            </ol>
          </div>
        </div>
      }
      {userExists &&
        <div role="alert" className="alert alert-warning">
          <FontAwesomeIcon icon={faExclamationCircle} className="shrink-0" />
          <div>
            User already exists
          </div>
        </div>
      }
      <label className="form-control">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <Input name="name" required control={control}/>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Username</span>
        </div>
        <Input name="username" required control={control}/>
      </label>
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
        <Input name="password" type="password" minLength={5} required control={control}/>
      </label>
      <div className="mt-4">
        <button type="submit" className="w-full btn btn-neutral" disabled={loading}>
          {loading && <span className="loading loading-spinner"></span>} Register
        </button>
      </div>
    </form>
  </div>
}