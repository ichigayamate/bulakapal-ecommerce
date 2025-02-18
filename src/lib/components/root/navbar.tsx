"use client";

import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faUserAlt} from "@fortawesome/free-solid-svg-icons";

type NavLinks = {
  name: string;
  href: string;
}

const navLinks: NavLinks[] = [{
  name: "Category 1",
  href: "/cat-1"
}]

export default function Navbar() {
  return <div
    className="navbar flex-col bg-white/80 backdrop-blur-2xl border-b border-b-neutral-300 fixed top-0 left-0 z-[1000] gap-2">
    <div className="flex items-center p-0 w-full">
      <div className="navbar-start flex"/>
      <div className="navbar-center flex">
        <Link href="/" className="btn btn-ghost text-xl">Bulakapal</Link>
      </div>
      <div className="navbar-end flex">
        <button className="btn btn-ghost btn-circle">
          <FontAwesomeIcon icon={faUserAlt}/>
        </button>
        <button className="btn btn-ghost btn-circle">
          <FontAwesomeIcon icon={faHeart}/>
        </button>
      </div>
    </div>
    <div className="p-0 w-full">
      <div className="navbar-start flex">
        <ul className="menu menu-vertical lg:menu-horizontal menu-md rounded-box p-0">
          {navLinks.map(({name, href}) => <li key={name}>
            <Link href={href}>{name}</Link>
          </li>)}
        </ul>
      </div>
      <div className="navbar-end flex">
        <input type="text" className="input input-bordered input-sm" />
      </div>
    </div>
  </div>
}