import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Header";
import HeroSection from "~/components/HeroSection";
import FilterSidebar from "~/components/FilterSidebar";
import HotelGrid from "~/components/HotelGrid";

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
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
          <FilterSidebar />
          <HotelGrid />
        </div>
      </main>
    </div>
  );
}