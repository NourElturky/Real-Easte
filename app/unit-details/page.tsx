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
    <div>
      <UnitDetails/>
      <PropertyDetails  details={propertyData}/>
    </div>
  );
};

export default Page;