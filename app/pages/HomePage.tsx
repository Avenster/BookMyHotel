import { useState, useEffect } from 'react';
import Navbar from "../components/Header";
import HeroSection from "../components/HeroSection";
import FilterSidebar from "../components/FilterSidebar";
import HotelGrid from "../components/HotelGrid";

const HomePage = () => {
  const [filters, setFilters] = useState({
    priceRanges: [],
    ratings: [],
    cities: []
  });
  
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://www.gocomet.com/api/assignment/hotels?page=1&size=100"
        );
        const data = await response.json();
        const uniqueCities = [...new Set(data.hotels.map((hotel) => hotel.city))];
        setCities(uniqueCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      }
    };
    fetchCities();
  }, []);

  // Handler for filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
          <FilterSidebar 
            onFilterChange={handleFilterChange} 
            cities={cities} 
          />
          <HotelGrid filters={filters} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;