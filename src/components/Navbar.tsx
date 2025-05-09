import React from "react";
import profile from "../../public/globe.svg";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4.5a.5.5 0 01.5-.5h13a.5.5 0 010 1H3.5a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h13a.5.5 0 010 1H3.5a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h13a.5.5 0 010 1H3.5a.5.5 0 01-.5-.5z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
          ></ul>
        </div>

        <Link
          className="btn btn-ghost normal-case text-xl hidden lg:flex"
          href="/"
        >
          ReadFlow
        </Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link href="/catalog">Katalog Książek</Link>
            </li>
          </ul>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image src={profile} alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact z-50 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Profil</a>
              </li>
              <li>
                <a>Ustawienia</a>
              </li>
              <li>
                <a>Wyloguj</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
