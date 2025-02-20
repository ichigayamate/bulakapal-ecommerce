"use client"

import {ReactNode} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UnauthOnlyLayout({children}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return <div className="flex justify-center">
    <div className="max-w-[400px] w-full tabs tabs-lifted">
      <div role="tablist" className="tabs tabs-bordered">
        <Link href="/login" role="tab" className={`tab ${pathname === "/login" ? "tab-active" : ""}`}>Log in</Link>
        <Link href="/register" role="tab" className={`tab ${pathname === "/register" ? "tab-active" : ""}`}>
          Don&#39;t have account
        </Link>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  </div>
}