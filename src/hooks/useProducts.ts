import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { Product, ProductFilters } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsData, categoriesData] = await Promise.all([
          apiService.fetchProducts(),
          apiService.fetchCategories()
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Apply price filter
    filtered = filtered.filter(product =>
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  }, [products, filters]);

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const getProductsByCategory = (category: string) => {
    return filteredProducts.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  return {
    products: filteredProducts,
    allProducts: products,
    categories,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    getProductsByCategory,
    getProductById,
  };
}; 