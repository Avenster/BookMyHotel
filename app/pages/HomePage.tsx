import { useState, useEffect } from 'react';
import Navbar from "../components/Header";
import HeroSection from "../components/HeroSection";
import FilterSidebar from "../components/FilterSidebar";
import HotelGrid from "../components/HotelGrid";
import { Filter } from 'lucide-react';

const HomePage = () => {
  const [filters, setFilters] = useState({
    priceRanges: [],
    ratings: [],
    cities: []
  });
  
  const [cities, setCities] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Close mobile filters after applying on mobile
    if (window.innerWidth < 768) {
      setShowMobileFilters(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        {/* Mobile Filter Button */}
        <div className="md:hidden sticky top-0 bg-white z-20 p-4 border-b">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 text-blue-600 font-medium"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* Mobile Filter Overlay */}
            <div className={`
              fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300
              ${showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              md:hidden
            `} onClick={() => setShowMobileFilters(false)} />
            
            {/* Filter Sidebar */}
            <div className={`
              fixed inset-y-0 left-0 w-80 bg-white z-40 transform transition-transform duration-300 ease-in-out
              ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}
              md:static md:transform-none md:w-64 md:block
            `}>
              <FilterSidebar 
                onFilterChange={handleFilterChange} 
                cities={cities}
                onClose={() => setShowMobileFilters(false)}
                isMobile={showMobileFilters} 
              />
            </div>
            
            {/* Hotel Grid */}
            <div className="flex-1">
              <HotelGrid filters={filters} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;