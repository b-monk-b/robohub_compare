'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface RobotFiltersProps {
  types: string[];
  applications: string[];
  brands: string[];
  currentFilters: {
    search?: string;
    type?: string[];
    application?: string[];
    brand?: string[];
    min_price?: number;
    max_price?: number;
    sort_by?: string;
  };
}

export function RobotFilters({ types, applications, brands, currentFilters }: RobotFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | string[] | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      
      // Handle array values (for multiple selections)
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(name, value.join(','));
        } else {
          params.delete(name);
        }
      } 
      // Handle string values
      else if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      
      // Reset to first page when filters change
      params.delete('page');
      
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (filterName: string, value: string, checked: boolean) => {
    const currentValues = searchParams.get(filterName)?.split(',') || [];
    let newValues: string[];

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }

    router.push(`/robots?${createQueryString(filterName, newValues)}`);
  };

  const handleSortChange = (value: string) => {
    router.push(`/robots?${createQueryString('sort_by', value)}`);
  };

  const handlePriceRangeChange = (min: string, max: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (min) params.set('min_price', min);
    else params.delete('min_price');
    
    if (max) params.set('max_price', max);
    else params.delete('max_price');
    
    router.push(`/robots?${params.toString()}`);
  };

  const isFilterActive = (filterName: string, value: string) => {
    return searchParams.get(filterName)?.split(',').includes(value) || false;
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search robots..."
            defaultValue={currentFilters.search || ''}
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const target = e.target as HTMLInputElement;
                router.push(`/robots?${createQueryString('search', target.value)}`);
              }
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Sort By</h3>
        <select
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={currentFilters.sort_by || 'name'}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="name">Name (A-Z)</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="payload">Payload (High to Low)</option>
          <option value="reach">Reach (High to Low)</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Price Range (INR)</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="min-price" className="sr-only">
              Min
            </label>
            <input
              type="number"
              id="min-price"
              placeholder="Min"
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              defaultValue={currentFilters.min_price || ''}
              onBlur={(e) => handlePriceRangeChange(e.target.value, searchParams.get('max_price') || '')}
            />
          </div>
          <div>
            <label htmlFor="max-price" className="sr-only">
              Max
            </label>
            <input
              type="number"
              id="max-price"
              placeholder="Max"
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              defaultValue={currentFilters.max_price || ''}
              onBlur={(e) => handlePriceRangeChange(searchParams.get('min_price') || '', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Robot Types */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Robot Type</h3>
        <div className="space-y-2">
          {types.map((type) => (
            <div key={type} className="flex items-center">
              <input
                id={`type-${type}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                checked={isFilterActive('type', type)}
                onChange={(e) => handleFilterChange('type', type, e.target.checked)}
              />
              <label
                htmlFor={`type-${type}`}
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Applications */}
      {applications.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Application</h3>
          <div className="space-y-2">
            {applications.map((app) => (
              <div key={app} className="flex items-center">
                <input
                  id={`app-${app}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  checked={isFilterActive('application', app)}
                  onChange={(e) => handleFilterChange('application', app, e.target.checked)}
                />
                <label
                  htmlFor={`app-${app}`}
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  {app}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Brand</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  id={`brand-${brand}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  checked={isFilterActive('brand', brand)}
                  onChange={(e) => handleFilterChange('brand', brand, e.target.checked)}
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {searchParams.toString() && (
        <div className="pt-4">
          <button
            type="button"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={() => router.push('/robots')}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
