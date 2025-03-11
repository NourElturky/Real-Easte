import React from "react";
import UnitDetails from "./UnitDetails";
import PropertyDetails from "./PropertyDetails";
import UserForm from "./UserForm";
import { ProjectDetails } from "@/app/_components/_types/ProjectDetails";
import ProjectDetailsComponent from "@/app/_components/ProjectDetailsComponent/ProjectDetailsComponent";

const propertyData = [
  { label: "Unit Code", value: "P103447I1" },
  { label: "Project", value: "Notion Compound" },
  { label: "Delivery", value: "2027" },
  { label: "Payment Option", value: "Installments" },
];

const projectDetails: ProjectDetails = {
  id: 1,
  developerName: "Tamayoz Developments",
  description:
    "A duplex is an amazing piece of architecture that offers a distinctive and adaptable way of living. Due to the coexistence of two unique living spaces within the same structure, it perfectly captures duality and symmetry. This duplex is created by Tamayoz in one of their unique projects The Lark Residence with prices range starting from 8470000 EGP and unit areas starting from 124 SQM in the vibrant neighborhood New Cairo.",
  developerDescription:
    " Tamayoz was founded as a Saudi-Egyptian developer in 2008 after setting up a series of real estate projects in Saudi Arabia, such as the University of Al-Batrash and Sheikh Khalid Abd El Aziz University. With its experience, it was able to create a successful set of projects in the Egyptian market.",
  image: "/images/img1.png",
};

const Page = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <UnitDetails />
      <div className="flex flex-col justify-between lg:flex-row gap-6">
        <div className="flex-1">
          <ProjectDetailsComponent project={projectDetails} />
          <PropertyDetails details={propertyData} />
        </div>
        <div className="w-[25%]">
          <UserForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
