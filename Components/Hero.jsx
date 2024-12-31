import Link from "next/link";
import React from "react";
import { FaFacebookSquare, FaGoogle, FaTwitch } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Hero = () => {
  return (
    <section className="min-w-screen flex items-center justify-center py-12  text-white  px-6 md:px-20">
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="text-center md:text-left mb-8 md:mb-0 max-w-md">
          <h1 className="text-4xl md:text-[3.60rem] leading-[1.1] font-bold ">
            An Unrivalled Online Casino and Sportsbook
          </h1>
          <Link href="/games">
            <button className="mt-7 mb-8 signup register bg-gradient-to-t from-teal-900 to-teal-800 text-white px-6 rounded-sm py-2">
              Sign up
            </button>
          </Link>
          <div className="orsignupwith mt-4">
            <span className="text-md">Or sign up with</span>
            {/*Social icons using react-icons*/}
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <div className=" facebook bg-zinc-800 px-3 text-xl rounded-sm py-3">
                <Link href="/games">
                  <FaFacebookSquare />
                </Link>
              </div>
              <div className="google bg-zinc-800 px-3 text-xl rounded-sm py-3">
                <Link href="/games">
                  <FaGoogle />
                </Link>
              </div>
              <div className="twitter bg-zinc-800 px-3 text-xl rounded-sm py-3">
                <Link href="/games">
                  <FaXTwitter />
                </Link>
              </div>
              <div className="twich bg-zinc-800 px-3 text-xl rounded-sm py-3">
                <Link href="/games">
                  <FaTwitch />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col-reverse md:flex-row justify-center gap-6 md:pr-12">
          <div className="box w-60 h-[24rem] p-[2px]  bg-gradient-to-t from-teal-700 to-teal-800  overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1446669052213-5dcff53f1f3f?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="box w-60 h-[24rem] p-[2px]  bg-gradient-to-t from-teal-700 to-teal-800 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1606398859237-bef6dcc14003?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
