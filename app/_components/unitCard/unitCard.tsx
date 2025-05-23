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
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { unitService } from "@/lib/api";

interface UnitCardProps {
  unit: Unit;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleCardClick = () => {
    if (session?.user) {
      // If the user is logged in, navigate to the unit details page with the unit ID
      router.push(`/unit-details?id=${unit.id}`);
    } else {
      // If the user is not logged in, redirect them to the login page
      router.push("/login");
    }
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking the favorite icon
    
    if (!session?.user) {
      toast.error("Please login to add favorites");
      return;
    }

    try {
      setIsFavorited((prev) => !prev);
      
      // Only make API call if the user is logged in
      if (session?.user) {
        await unitService.addToFavorites(unit.id);
        toast.success(isFavorited ? "Removed from favorites" : "Added to favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setIsFavorited((prev) => !prev); // Revert state on error
      toast.error("Failed to update favorites");
    }
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
        <div 
          className="absolute top-5 right-5 cursor-pointer"
          onClick={toggleFavorite}
        >
          <FavoriteIcon
            fill={isFavorited ? "red" : "white"}
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
