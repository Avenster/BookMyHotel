import React, { useState, useEffect } from 'react';
import HotelCard from './HotelCard';

const HotelGrid = ({ filters }) => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHotels, setTotalHotels] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);
  const pageSize = 6; // Changed to show 6 items per page

  useEffect(() => {
    fetchHotels();
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  useEffect(() => {
    fetchHotels();
  }, [currentPage, sortBy]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://www.gocomet.com/api/assignment/hotels?page=1&size=100'
      );

      const data = await response.json();
      let allHotels = data.hotels || [];
      
      // Apply filters
      if (filters && Object.values(filters).some(f => f.length > 0)) {
        allHotels = allHotels.filter(hotel => {
          const priceRange = Math.max(...hotel.rooms.map(r => r.price));
          const matchesPrice = filters.priceRanges.length === 0 || filters.priceRanges.some(range => {
            const [min, max] = getPriceRange(range);
            return priceRange >= min && priceRange <= max;
          });

          const matchesRating = filters.ratings.length === 0 || 
            filters.ratings.includes(Math.floor(hotel.rating));

          const matchesCity = filters.cities.length === 0 || 
            filters.cities.includes(hotel.city);

          return matchesPrice && matchesRating && matchesCity;
        });
      }

      if (sortBy) {
        allHotels = sortHotels(allHotels, sortBy);
      }
      
      setHotels(allHotels);
      setTotalHotels(allHotels.length);
      setTotalPages(Math.ceil(allHotels.length / pageSize));
      
      if (currentPage > Math.ceil(allHotels.length / pageSize)) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriceRange = (rangeLabel) => {
    const ranges = {
      'Up to Rs. 1000': [0, 1000],
      'Rs. 1001 to Rs. 5000': [1001, 5000],
      'Rs. 5001 to Rs. 10000': [5001, 10000],
      'Above Rs. 10000': [10001, Infinity]
    };
    return ranges[rangeLabel] || [0, Infinity];
  };

  const calculatePriceRange = (rooms) => {
    if (!rooms || !rooms.length) return "N/A";
    const prices = rooms.map(room => room.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return `₹${minPrice} - ₹${maxPrice}`;
  };

  const sortHotels = (hotelsList, sortType) => {
    switch (sortType) {
      case 'price-low':
        return [...hotelsList].sort((a, b) => {
          const aMin = Math.min(...a.rooms.map(r => r.price));
          const bMin = Math.min(...b.rooms.map(r => r.price));
          return aMin - bMin;
        });
      case 'price-high':
        return [...hotelsList].sort((a, b) => {
          const aMax = Math.max(...a.rooms.map(r => r.price));
          const bMax = Math.max(...b.rooms.map(r => r.price));
          return bMax - aMax;
        });
      case 'rating':
        return [...hotelsList].sort((a, b) => b.rating - a.rating);
      default:
        return hotelsList;
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 3;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded text-black ${
            i === currentPage ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <section className="flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h2 className="text-xl font-semibold text-black">
          Explore Hotels
        </h2>
        <select 
          className="w-full sm:w-auto p-2 border rounded"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading hotels...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {hotels
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  location={hotel.city}
                  rating={hotel.rating}
                  price={calculatePriceRange(hotel.rooms)}
                />
              ))}
          </div>
          
          {totalHotels > pageSize && (
            <nav className="flex flex-wrap justify-center gap-2 mt-8" aria-label="Pagination">
              <button 
                className={`px-3 py-1 border rounded hover:bg-gray-50 text-gray-700 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {renderPaginationButtons()}
              </div>
              
              <button 
                className={`px-3 py-1 border rounded hover:bg-gray-50 text-black ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
};

export default HotelGrid;