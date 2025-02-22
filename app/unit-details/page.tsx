import React from "react";
import UnitDetails from "./UnitDetails";
import PropertyDetails from "./PropertyDetails";

const propertyData = [
  { label: "Unit Code", value: "P103447I1" },
  { label: "Project", value: "Notion Compound" },
  { label: "Delivery", value: "2027" },
  { label: "Payment Option", value: "Installments" },
];
const Page = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <UnitDetails/>
      <PropertyDetails  details={propertyData}/>
    </div>
  );
};

export default Page;