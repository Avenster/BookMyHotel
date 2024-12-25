export interface HotelCardProps {
    id?: string;
    name: string;
    location: string;
    rating: number;
    price: string;
    imageUrl?: string;
  }
  
  export interface FilterSection {
    title: string;
    children: React.ReactNode;
  }