import React from 'react';
import { X } from 'lucide-react';
import { FilterSection } from './FilterSection';

const FilterSidebar = ({ onFilterChange, cities, onClose, isMobile }) => {
  return (
    <aside className="h-full flex flex-col">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="font-semibold text-black text-sm">Filters</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Filters Content */}
      <div className="flex-1 p-3 md:p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          {!isMobile && <h2 className="font-semibold text-black">Filters</h2>}
          <button className="text-blue-600 text-xs md:text-sm hover:text-blue-700 px-2 md:px-5">
            CLEAR ALL
          </button>
        </div>

        <div className="space-y-3 md:space-y-6">
          <FilterSection title="PRICE RANGE">
            <div className="space-y-1 md:space-y-2">
              {['Up to Rs. 1000', 'Rs. 1001 to Rs. 5000', 'Rs. 5001 to Rs. 10000', 'Above Rs. 10000'].map(range => (
                <label key={range} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600 bg-white w-4 h-4" />
                  <span className="text-xs md:text-sm text-black">{range}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="RATING">
            <div className="space-y-1 md:space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                  <span className="text-xs md:text-sm text-black">{rating} Star</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="CITY">
            <div className="space-y-1 md:space-y-2">
              {['Mumbai', 'Kolkata', 'Bangalore', 'Jaipur'].map(city => (
                <label key={city} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600 bg-white w-4 h-4" />
                  <span className="text-xs md:text-sm text-black">{city}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && (
        <div className="p-3 border-t">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
          >
            Apply Filters
          </button>
        </div>
      )}
    </aside>
  );
};

export default FilterSidebar;