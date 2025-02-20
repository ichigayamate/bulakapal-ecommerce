import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {checkAuth} from "@scripts/auth/check-auth";
import LogoutButton from "@components/root/logout-button";

type NavLinks = {
  name: string;
  href: string;
}

const navLinks: NavLinks[] = [{
  name: "Products",
  href: "/products"
}]

export default async function Navbar() {
  const auth = await checkAuth();

  return <div
    className="navbar flex-col bg-white/80 backdrop-blur-2xl border-b border-b-neutral-300 fixed top-0 left-0 z-[1000] gap-2">
    <div className="flex items-center p-0 w-full">
      <div className="navbar-start flex"/>
      <div className="navbar-center flex">
        <Link href="/" className="btn btn-ghost text-xl">Bulakapal</Link>
      </div>
      <div className="navbar-end flex gap-2">
        {auth ? <>
          <Link href="/wishlist" title="Wishlist" className="btn btn-ghost btn-circle">
            <FontAwesomeIcon icon={faHeart}/>
          </Link>
          <LogoutButton />
        </> : <>
          <Link href="/login" className="btn btn-ghost btn-circle">
            <FontAwesomeIcon icon={faUserAlt}/>
          </Link>
          <Link href="/wishlist" title="Wishlist" className="btn btn-ghost btn-circle">
            <FontAwesomeIcon icon={faHeart}/>
          </Link>
        </>
        }
      </div>
    </div>
    <div className="p-0 w-full">
      <div className="navbar-start flex">
        <ul className="menu menu-vertical lg:menu-horizontal menu-md rounded-box p-0">
          {navLinks.map(({name, href}) => <li key={name}>
            <Link href={href} className="active:!bg-neutral-300 !text-black">{name}</Link>
          </li>)}
        </ul>
      </div>
      <div className="navbar-end flex">
        <input type="text" className="input input-bordered input-sm"/>
      </div>
    </div>
  </div>
}