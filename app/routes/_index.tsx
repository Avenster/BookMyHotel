import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Header";
import HeroSection from "~/components/HeroSection";
import Home from "~/pages/HomePage";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "BookMyHotel - Find Perfect Hotel Deals" },
    { name: "description", content: "Find and book the best hotel deals across top destinations" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />

          <Home/>
      </main>
      <Footer />
    </div>
  );
}