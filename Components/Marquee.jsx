import Link from "next/link";
import React from "react";

const Marquee = () => {
  return (
    <div className="w-full bg-gradient-to-l from-teal-950 to-teal-900 text-white text-center py-8 mb-4">
      <div className="marquee">
        <marquee>
          <div>
            <h2 className="text-3xl font-bold">
              Only Made for Fun and Tesing Purpose by Abhay
              (email:patelabhay550@gmail.com)
            </h2>
          </div>
        </marquee>
      </div>
    </div>
  );
};

export default Marquee;
