"use client";
import Image from "next/image";
import { AreaIcon, BadroomIcon, BathroomIcon } from "../_components/svgs";

const propertyData = {
  price: "3,654,000",
  downPayment: "0",
  monthlyPayment: "30,450",
  rooms: 1,
  baths: 1,
  size: 44,
  images: [
    "/images/img1.png",
    "/images/img2.png",
    "/images/img3.png",
    "/images/img6.png",
  ],
};

const UnitDetails = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg text-left">
      {/* Price Details */}
      <div className="flex justify-start items-center mb-4 gap-8">
        <div>
          <p className="text-gray-500 text-sm">Starting From</p>
          <p className="text-2xl font-bold">{propertyData.price} EGP</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Minimum Downpayment</p>
          <p className="text-xl">{propertyData.downPayment} EGP</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Minimum Monthly Payment</p>
          <p className="text-xl font-bold">{propertyData.monthlyPayment} EGP</p>
        </div>
      </div>

      {/* Property Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <BadroomIcon className="w-5 h-5" />
          <span>{propertyData.rooms} ROOMS</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <BathroomIcon className="w-5 h-5" />
          <span>{propertyData.baths} BATHS</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <AreaIcon className="w-5 h-5" />
          <span>{propertyData.size} M²</span>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-3 gap-2">
        {/* Main Image */}
        <div className="col-span-2 relative w-full h-[50vh] rounded-lg overflow-hidden">
          <Image
            src={propertyData.images[0]}
            alt="Main Property"
            fill
            className="object-cover"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="grid grid-cols-1 gap-2">
          {propertyData.images.slice(1, 3).map((image, index) => (
            <div
              key={index}
              className="relative w-full h-[24vh] rounded-lg overflow-hidden"
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
    </div>
  );
};

export default UnitDetails;
