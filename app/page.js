import Hero from "@/Components/Hero";
import Marquee from "@/Components/Marquee";
import Navbar from "@/Components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="nav w-full ">
          <Navbar />
        </div>
        <div className="hero k mb-16">
          <Hero />
        </div>
        <div className="marquee">
          <Marquee />
        </div>
      </main>
    </>
  );
}
