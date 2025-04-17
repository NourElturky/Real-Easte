"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchForm = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    status: '',
    minBedrooms: '',
    minBathrooms: '',
    minArea: '',
    maxArea: '',
    featured: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setSearchParams(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setSearchParams(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query string
    const params = new URLSearchParams();
    
    if (searchParams.keyword) params.append('keyword', searchParams.keyword);
    if (searchParams.status) params.append('status', searchParams.status);
    if (searchParams.minBedrooms) params.append('minBedrooms', searchParams.minBedrooms);
    if (searchParams.minBathrooms) params.append('minBathrooms', searchParams.minBathrooms);
    if (searchParams.minArea) params.append('minArea', searchParams.minArea);
    if (searchParams.maxArea) params.append('maxArea', searchParams.maxArea);
    if (searchParams.featured) params.append('featured', 'true');
    
    // Navigate to search page with query params
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Find Your Dream Property</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Keyword Search */}
          <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
              Search by keyword
            </label>
            <input
              type="text"
              id="keyword"
              name="keyword"
              value={searchParams.keyword}
              onChange={handleChange}
              placeholder="Location, property name, etc."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
            />
          </div>
          
          {/* Property Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Property Status
            </label>
            <select
              id="status"
              name="status"
              value={searchParams.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
            >
              <option value="">Any Status</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>
          
          {/* Min Bedrooms */}
          <div>
            <label htmlFor="minBedrooms" className="block text-sm font-medium text-gray-700 mb-1">
              Min Bedrooms
            </label>
            <select
              id="minBedrooms"
              name="minBedrooms"
              value={searchParams.minBedrooms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          
          {/* Min Bathrooms */}
          <div>
            <label htmlFor="minBathrooms" className="block text-sm font-medium text-gray-700 mb-1">
              Min Bathrooms
            </label>
            <select
              id="minBathrooms"
              name="minBathrooms"
              value={searchParams.minBathrooms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          
          {/* Min Area */}
          <div>
            <label htmlFor="minArea" className="block text-sm font-medium text-gray-700 mb-1">
              Min Area (m²)
            </label>
            <input
              type="number"
              id="minArea"
              name="minArea"
              value={searchParams.minArea}
              onChange={handleChange}
              placeholder="Min Area"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
            />
          </div>
          
          {/* Max Area */}
          <div>
            <label htmlFor="maxArea" className="block text-sm font-medium text-gray-700 mb-1">
              Max Area (m²)
            </label>
            <input
              type="number"
              id="maxArea"
              name="maxArea"
              value={searchParams.maxArea}
              onChange={handleChange}
              placeholder="Max Area"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
            />
          </div>
        </div>
        
        {/* Featured Only Checkbox */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={searchParams.featured}
              onChange={handleChange}
              className="h-4 w-4 text-[#1F4B43] focus:ring-[#1F4B43] border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Featured Properties Only</span>
          </label>
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#1F4B43] text-white py-2 px-6 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F4B43]"
          >
            Search Properties
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
