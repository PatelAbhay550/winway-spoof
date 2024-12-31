import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex items-center bg-zinc-800 justify-between w-full h-[60px] px-5">
        <div className="left">
          <div className="logo">
            <p className="logotxt logo text-2xl">Winway</p>
          </div>
        </div>
        <div className="right">
          <div className="btns flex items-center gap-4">
            <div className="signinbtn">
              <Link href="/games">
                <button className="signin">Signin</button>
              </Link>
            </div>
            <div className="registerbtn">
              <Link href="/games">
                <button className="register bg-gradient-to-t from-teal-900 to-teal-800 text-white px-4 py-2">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
