import React from "react";

interface PropertyDetail {
  label: string;
  value: string;
}

interface PropertyDetailsProps {
  details: PropertyDetail[];
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ details }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Property Details</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {details.map((detail, index) => (
          <div key={index} className={detail.label === "Payment Option" ? "col-span-2" : ""}>
            <span className="text-gray-500">{detail.label}</span>
            <p className="font-semibold">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;
