import React from "react";
import { Property } from "../_types/PropertyType";

interface PropertyCardProps {
    property: Property;
    index: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
    return (
        <a
            href={property.link}
            key={property.id}
            className={`relative rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${index === 0 ? "col-span-2" : "col-span-1"
                } h-[395px]`}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/10 to-transparent" />
            <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-0 left-0 mt-[45px] ml-[50px] text-white">
                <p>{property.count} Properties</p>
                <p className="text-xl font-medium">{property.title}</p>
            </div>
        </a>
    );
};

export default PropertyCard;
