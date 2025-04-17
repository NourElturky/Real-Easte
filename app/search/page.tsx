"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/app/_components/header/Header';
import Footer from '@/app/_components/footer/Footer';
import UnitGrid from '@/app/_components/unitCard/unitGrid';
import { Unit } from '@/app/_components/_types/CardTypes';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get all search params
  const status = searchParams.get('status');
  const keyword = searchParams.get('keyword');
  const minBedrooms = searchParams.get('minBedrooms');
  const minBathrooms = searchParams.get('minBathrooms');
  const minArea = searchParams.get('minArea');
  const maxArea = searchParams.get('maxArea');
  const featured = searchParams.get('featured') === 'true';
  
  // Build the query string
  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    if (status) params.append('status', status);
    if (keyword) params.append('keyword', keyword);
    if (minBedrooms) params.append('minBedrooms', minBedrooms);
    if (minBathrooms) params.append('minBathrooms', minBathrooms);
    if (minArea) params.append('minArea', minArea);
    if (maxArea) params.append('maxArea', maxArea);
    if (featured) params.append('featured', 'true');
    
    return params.toString();
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const queryString = buildQueryString();
        const res = await fetch(`/api/units/search?${queryString}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch search results');
        }
        
        const data = await res.json();
        setUnits(data);
      } catch (err) {
        setError('Error fetching search results. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [status, keyword, minBedrooms, minBathrooms, minArea, maxArea, featured]);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 sm:p-6">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        
        {/* Search summary */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Search Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {status && (
              <div>
                <span className="font-medium">Status:</span> {status}
              </div>
            )}
            {keyword && (
              <div>
                <span className="font-medium">Keyword:</span> {keyword}
              </div>
            )}
            {minBedrooms && (
              <div>
                <span className="font-medium">Min Bedrooms:</span> {minBedrooms}
              </div>
            )}
            {minBathrooms && (
              <div>
                <span className="font-medium">Min Bathrooms:</span> {minBathrooms}
              </div>
            )}
            {minArea && (
              <div>
                <span className="font-medium">Min Area:</span> {minArea} m²
              </div>
            )}
            {maxArea && (
              <div>
                <span className="font-medium">Max Area:</span> {maxArea} m²
              </div>
            )}
            {featured && (
              <div>
                <span className="font-medium">Featured Only:</span> Yes
              </div>
            )}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1F4B43]"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : units.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No properties found</h2>
            <p className="text-gray-600">Try adjusting your search criteria to find more results.</p>
          </div>
        ) : (
          <UnitGrid 
            units={units} 
            title={`Found ${units.length} properties`} 
            gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
