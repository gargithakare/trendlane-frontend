export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  material: string;
  fit: string;
  sizes: string[];
  colors: string[];
}

export interface ApiResponse {
  products: Product[];
}

class ApiService {
  private baseUrl = 'https://fakestoreapi.com';
  private fallbackUrl = '/products.json';

  async fetchProducts(): Promise<Product[]> {
    try {
      // Try to fetch from FakeStore API first
      const response = await fetch(`${this.baseUrl}/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch from FakeStore API');
      }

      const data = await response.json();
      
      // Transform FakeStore API data to match our Product interface
      return data.map((item: any) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
        category: item.category,
        description: item.description,
        rating: item.rating?.rate || 4.0,
        material: '100% Cotton', // Default since FakeStore doesn't provide this
        fit: 'Regular Fit', // Default since FakeStore doesn't provide this
        sizes: ['S', 'M', 'L', 'XL'], // Default sizes
        colors: ['Default'] // Default color
      }));
    } catch (error) {
      console.warn('FakeStore API failed, using fallback data:', error);
      
      // Fallback to local JSON file
      try {
        const response = await fetch(this.fallbackUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch fallback data');
        }
        
        const data: ApiResponse = await response.json();
        return data.products;
      } catch (fallbackError) {
        console.error('Both API and fallback failed:', fallbackError);
        throw new Error('Unable to fetch products');
      }
    }
  }

  async fetchProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products/category/${category}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} products`);
      }

      const data = await response.json();
      
      return data.map((item: any) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
        category: item.category,
        description: item.description,
        rating: item.rating?.rate || 4.0,
        material: '100% Cotton',
        fit: 'Regular Fit',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Default']
      }));
    } catch (error) {
      console.warn(`Failed to fetch ${category} products:`, error);
      // Return empty array if category fetch fails
      return [];
    }
  }

  async fetchCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products/categories`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      return await response.json();
    } catch (error) {
      console.warn('Failed to fetch categories:', error);
      // Return default categories
      return ['Tops', 'Pants', 'Shirts', 'Dresses'];
    }
  }
}

export const apiService = new ApiService(); 