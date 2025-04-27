"use client";
import { AreaIcon, BadroomIcon, BathroomIcon } from "@/app/_components/svgs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { unitService, Unit } from "@/lib/api";
import { toast } from "sonner";

const UnitDetails = () => {
  const searchParams = useSearchParams();
  const unitId = searchParams.get('id');
  
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<Unit | null>(null);
  const [apiError, setApiError] = useState(false);
  
  // Fallback data in case API call fails
  const fallbackData = {
    name: "Duplex For Sale In The La Vida",
    price: "3,654,000",
    downPayment: "365,400",
    monthlyPayment: "30,450",
    rooms: 3,
    baths: 2,
    size: 120,
    images: [
      "/images/img1.png",
      "/images/img2.png",
      "/images/img3.png",
      "/images/img6.png",
    ],
  };
  
  useEffect(() => {
    const fetchUnitData = async () => {
      if (!unitId) {
        setLoading(false);
        return;
      }
      
      try {
        console.log(`Fetching unit data for ID: ${unitId}`);
        const response = await unitService.getUnit(Number(unitId));
        console.log("Unit data response:", response);
        
        if (response && response.data) {
          setUnit(response.data);
        } else {
          throw new Error("No unit data returned from API");
        }
      } catch (error) {
        console.error("Error fetching unit details:", error);
        toast.error("Could not load unit details from API");
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUnitData();
  }, [unitId]);
  
  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
        <p>Loading unit details...</p>
      </div>
    );
  }

  // Extract data from API response or use fallback
  const images = unit?.media?.length 
    ? unit.media.map(media => media.original_url) 
    : fallbackData.images;
  
  const unitName = unit?.unit_type 
    ? `${unit.unit_type} for Sale` 
    : fallbackData.name;
  
  const unitSize = unit?.unit_area 
    ? parseInt(unit.unit_area) 
    : fallbackData.size;
  
  const bedrooms = unit?.number_of_bedrooms || fallbackData.rooms;
  const bathrooms = unit?.number_of_bathrooms || fallbackData.baths;
  
  // Calculate price information based on size if unit data is available
  const unitPrice = unit ? parseInt(unit.unit_area) * 30000 : parseInt(fallbackData.price.replace(/,/g, ''));
  const formattedPrice = unitPrice.toLocaleString();
  
  const downPayment = Math.round(unitPrice * 0.1).toLocaleString();
  const monthlyPayment = Math.round(unitPrice * 0.008).toLocaleString();

  return (
    <div className="max-w-full mx-auto p-6 bg-white text-left">
      {apiError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p className="font-bold">Notice</p>
          <p>Could not load unit data from API. Showing sample data instead.</p>
        </div>
      )}
      
      <p className="text-xl font-bold mb-3">{unitName}</p>

      {/* Price Details */}
      <div className="flex flex-col md:flex-row justify-start items-start md:items-center mb-4 gap-4 md:gap-8">
        <div>
          <p className="text-gray-500 text-sm">Starting From</p>
          <p className="text-2xl font-bold">
            {formattedPrice}
            <span className="text-xs"> EGP</span>
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Minimum Downpayment</p>
          <p className="text-xl font-bold">
            {downPayment}
            <span className="text-xs"> EGP</span>
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Minimum Monthly Payment</p>
          <p className="text-xl font-bold">
            {monthlyPayment}
            <span className="text-xs"> EGP</span>
          </p>
        </div>
      </div>

      {/* Property Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <BadroomIcon className="w-5 h-5" />
          <span>{bedrooms} ROOMS</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <BathroomIcon className="w-5 h-5" />
          <span>{bathrooms} BATHS</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <AreaIcon className="w-5 h-5" />
          <span>{unitSize} M²</span>
        </div>
      </div>

      {/* Delivery Date */}
      {unit?.expected_delivery_date && (
        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">Expected Delivery:</span> {new Date(unit.expected_delivery_date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      )}

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Main Image */}
        <div className="md:col-span-2 relative w-full h-[30vh] md:h-[50vh] rounded-lg overflow-hidden">
          <Image
            src={images[0] || "/images/img1.png"}
            alt="Main Property"
            fill
            className="object-cover"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 mt-2 md:mt-0">
          {(images.length > 1 ? images.slice(1, 3) : ["/images/img2.png", "/images/img3.png"]).map((image, index) => (
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

      {/* Status */}
      {unit?.unit_status && (
        <div className="mt-4 inline-block px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
          {unit.unit_status}
        </div>
      )}
    </div>
  );
};

export default UnitDetails;
