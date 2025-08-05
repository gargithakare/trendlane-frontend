export type Product = {
    id: number;
    name: string; // renamed from title
    price: number;
    image: string;
    category: string;
    description: string;
    rating: number;
    material: string;
    fit: string;
    sizes: string[];
    colors: string[];
  };

export type ProductFilters = {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'name' | 'price' | 'rating';
  sortOrder: 'asc' | 'desc';
};
  