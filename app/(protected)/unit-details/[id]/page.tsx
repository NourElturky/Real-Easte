"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { AreaIcon, BadroomIcon, BathroomIcon } from "@/app/_components/svgs";
import PropertyDetails from "../PropertyDetails";
import { useParams } from 'next/navigation';
import Header from '@/app/_components/header/Header';
import Footer from '@/app/_components/footer/Footer';

interface UnitDetail {
  id: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: string;
  image: string;
  status: 'For Sale' | 'For Rent';
  delivery?: "Featured";
  name: string;
  downPayment: string;
  monthlyPayment: string;
  rooms: number;
  baths: number;
  size: number;
  images: string[];
  description: string;
  propertyDetails: { label: string; value: string }[];
}

const UnitDetailsPage = () => {
  const params = useParams();
  const [unit, setUnit] = useState<UnitDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const res = await fetch(`/api/units/${params.id}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch unit details');
        }
        
        const data = await res.json();
        setUnit(data);
      } catch (err) {
        setError('Error loading unit details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchUnit();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1F4B43]"></div>
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="container mx-auto p-4 h-screen flex items-center justify-center">
        <div className="text-red-500">{error || 'Unit not found'}</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-full mx-auto p-6 bg-white text-left">
        <p className="text-xl font-bold mb-3">{unit.name}</p>

        {/* Price Details */}
        <div className="flex justify-start items-center mb-4 gap-8 flex-wrap">
          <div>
            <p className="text-gray-500 text-sm">Starting From</p>
            <p className="text-2xl font-bold">
              {unit.price}
              <span className="text-xs"> EGP</span>
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Minimum Downpayment</p>
            <p className="text-xl font-bold">
              {unit.downPayment}
              <span className="text-xs"> EGP</span>
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Minimum Monthly Payment</p>
            <p className="text-xl font-bold">
              {unit.monthlyPayment}
              <span className="text-xs"> EGP</span>
            </p>
          </div>
        </div>

        {/* Property Info */}
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2 text-gray-700">
            <BadroomIcon className="w-5 h-5" />
            <span>{unit.rooms} ROOMS</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <BathroomIcon className="w-5 h-5" />
            <span>{unit.baths} BATHS</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <AreaIcon className="w-5 h-5" />
            <span>{unit.size} M²</span>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Main Image */}
          <div className="md:col-span-2 relative w-full h-[30vh] md:h-[50vh] rounded-lg overflow-hidden">
            <Image
              src={unit.images[0]}
              alt="Main Property"
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {unit.images.slice(1, 3).map((image, index) => (
              <div
                key={index}
                className="relative w-full h-[15vh] md:h-[24vh] rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Property ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700">{unit.description}</p>
        </div>

        {/* Property Details */}
        <div className="mt-8">
          <PropertyDetails details={unit.propertyDetails} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UnitDetailsPage;
