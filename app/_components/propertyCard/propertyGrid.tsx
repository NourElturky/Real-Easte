import React from "react";
import { Property } from "../_types/PropertyType";
import PropertyCard from "./propertyCard";

interface PropertyCardGridProps {
    properties: Property[];
}

const PropertyGrid: React.FC<PropertyCardGridProps> = ({ properties }) => {
    return (
        <section className="py-16">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-medium text-center">
                    Explore Our Properties
                </h2>
                <p className="text-black">Lorem ipsum dolor sit amet</p>
            </div>

            <div className="grid grid-cols-4 gap-6 px-4">
                {properties.map((property, index) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default PropertyGrid;
