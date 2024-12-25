import React from 'react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FilterSection = ({ title, children }: FilterSectionProps) => (
  <div className="mb-6 border-b pb-4">
    <h3 className="font-semibold mb-2 text-black">{title}</h3>
    <div className="space-y-2 ">
      {children}
    </div>
  </div>
);
