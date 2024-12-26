import React from 'react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FilterSection = ({ title, children }: FilterSectionProps) => (
  <div className="border-b pb-3 md:pb-4">
    <h3 className="font-semibold mb-2 text-xs md:text-sm text-black">{title}</h3>
    {children}
  </div>
);