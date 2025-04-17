"use client"
import { useRouter } from "next/navigation";
import { Unit } from "../_types/CardTypes";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  BathroomIcon,
  BadroomIcon,
  AreaIcon,
  LocationIcon,
  FavoriteIcon,
} from "../svgs";
import { useState } from "react";

interface UnitCardProps {
  unit: Unit;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  // Check if the user is logged in by verifying the user data in localStorage
  const isUserLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("userData");

  const handleCardClick = () => {
    if (isUserLoggedIn) {
      // If the user is logged in, navigate to the specific unit details page
      router.push(`/unit-details/${unit.id}`);
    } else {
      // If the user is not logged in, redirect them to the login page
      router.push("/login");
    }
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from triggering
    setIsFavorited((prev) => !prev);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg w-full sm:w-[300px] md:w-[350px] cursor-pointer lg:w-auto h-auto"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative">
        <Image
          src={unit.image}
          alt={unit.location}
          width={447}
          height={300}
          className="w-full h-[200px] md:h-[250px] lg:h-[311px] object-cover rounded-t-lg"
        />

        {/* Status Badge */}
        <div className="absolute top-5 left-5 flex gap-2.5">
          {unit.delivery === "Featured" && (
            <span className="bg-[#E7C873] text-white text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          {(unit.status === "For Sale" || unit.status === "For Rent") && (
            <span className="bg-[#1F4B43] text-white text-xs px-2 py-1 rounded-full">
              {unit.status}
            </span>
          )}
        </div>

        {/* Heart Icon */}
        <div className="absolute top-5 right-5 cursor-pointer">
          <FavoriteIcon
            fill={isFavorited ? "red" : "white"}
            onClick={toggleFavorite}
          />
        </div>
      </div>

      {/* Unit Details */}
      <div className="p-4">
        <h2 className="text-sm md:text-base font-semibold mb-1">
          {unit.location}
        </h2>
        <div className="flex gap-2">
          <LocationIcon />
          <p className="text-xs md:text-sm mb-4">{unit.address}</p>
        </div>
        <Separator />
        <div className="flex justify-between items-center text-xs md:text-sm mt-4">
          <div className="flex gap-3">
            <div className="flex gap-2 pl-2">
              <BadroomIcon />
              <p>{unit.bedrooms}</p>
            </div>
            <div className="flex gap-2 pl-2 border-l border-gray-200">
              <BathroomIcon />
              <p>{unit.bathrooms}</p>
            </div>
            <div className="flex gap-2 pl-2 border-l border-gray-200">
              <AreaIcon />
              <p>{unit.area}</p>
            </div>
          </div>

          <div className="text-[#EB664E] font-semibold">{unit.price}</div>
        </div>
      </div>
    </div>
  );
};

export default UnitCard;
