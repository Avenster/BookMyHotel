import React from 'react';
import { FilterSection } from './FilterSection'; 

const FilterSidebar = () => (
  <aside className="w-64 flex-shrink-0 border-r">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-semibold text-black">Filters</h2>
      <button className="text-blue-600 text-sm hover:text-blue-700 px-5">CLEAR ALL</button>
    </div>

    <FilterSection title="PRICE RANGE">
      {['Up to Rs. 1000', 'Rs. 1001 to Rs. 5000', 'Rs. 5001 to Rs. 10000', 'Above Rs. 10000'].map(range => (
        <label key={range} className="flex items-center  gap-2">
          <input type="checkbox" className="accent-blue-600 bg-white" />
          <span className="text-sm text-black">{range}</span>
        </label>
      ))}
    </FilterSection>

    <FilterSection title="RATING">
      {[5, 4, 3, 2, 1].map(rating => (
        <label key={rating} className="flex items-center gap-2">
          <input type="checkbox" className="accent-blue-600" />
          <span className="text-sm text-black">{rating} Star</span>
        </label>
      ))}
    </FilterSection>

    <FilterSection title="CITY">
      {['Mumbai', 'Kolkata', 'Bangalore', 'Jaipur'].map(city => (
        <label key={city} className="flex items-center gap-2">
          <input type="checkbox" className="accent-blue-600 bg-white" />
          <span className="text-sm text-black">{city}</span>
        </label>
      ))}
    </FilterSection>
  </aside>
);

export default FilterSidebar;
