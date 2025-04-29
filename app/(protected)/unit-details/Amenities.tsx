"use client";

import React from "react";
import {
  FaDumbbell,
  FaParking,
  FaSwimmer,
  FaLeaf,
  FaShieldAlt,
  FaArrowUp,
  FaHospital,
  FaUtensils,
  FaUniversity,
  FaSchool,
} from "react-icons/fa";
import { HiHome } from "react-icons/hi";

const staticAmenities = [
  {
    label: "Swimming Pool",
    icon: <FaSwimmer className="h-6 w-6 text-gray-600" />,
  },
  { label: "Gym", icon: <FaDumbbell className="h-6 w-6 text-gray-600" /> },
  { label: "Parking", icon: <FaParking className="h-6 w-6 text-gray-600" /> },
  { label: "Garden", icon: <FaLeaf className="h-6 w-6 text-gray-600" /> },
  {
    label: "Security",
    icon: <FaShieldAlt className="h-6 w-6 text-gray-600" />,
  },
  { label: "Elevator", icon: <FaArrowUp className="h-6 w-6 text-gray-600" /> },
  { label: "Home", icon: <HiHome className="h-6 w-6 text-gray-600" /> },
  { icon: <FaSchool className="h-6 w-6 text-gray-600" />, label: "School" },
  {
    icon: <FaUniversity className="h-6 w-6 text-gray-600" />,
    label: "University",
  },
  { icon: <FaHospital className="h-6 w-6 text-gray-600" />, label: "Hospital" },
  {
    icon: <FaUtensils className="h-6 w-6 text-gray-600" />,
    label: "Restaurant",
  },
];

const AmenityList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {staticAmenities.map((amenity, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 p-2 bg-white rounded-md shadow-md"
        >
          {amenity.icon}
          <span className="text-sm font-medium">{amenity.label}</span>
        </div>
      ))}
    </div>
  );
};

export default AmenityList;
