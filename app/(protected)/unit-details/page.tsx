"use client";
import React, { useEffect, useState } from "react";
import UnitDetails from "./UnitDetails";
import PropertyDetails from "./PropertyDetails";
import UserForm from "./UserForm";
import { ProjectDetails } from "@/app/_components/_types/ProjectDetails";
import ProjectDetailsComponent from "@/app/_components/ProjectDetailsComponent/ProjectDetailsComponent";
import { useSearchParams } from "next/navigation";
import { unitService, projectService } from "@/lib/api";
import { toast } from "sonner";
import Amenities from "./Amenities"; // Import the Amenities component
import AmenityList from "./Amenities";

// Fallback property details
const fallbackPropertyData = [
  { label: "Unit Code", value: "P103447I1" },
  { label: "Project", value: "Notion Compound" },
  { label: "Delivery", value: "2027" },
  { label: "Payment Option", value: "Installments" },
];

// Fallback project details
const fallbackProjectDetails: ProjectDetails = {
  id: 1,
  developerName: "Tamayoz Developments",
  description:
    "A duplex is an amazing piece of architecture that offers a distinctive and adaptable way of living. Due to the coexistence of two unique living spaces within the same structure, it perfectly captures duality and symmetry. This duplex is created by Tamayoz in one of their unique projects The Lark Residence with prices range starting from 8470000 EGP and unit areas starting from 124 SQM in the vibrant neighborhood New Cairo.",
  developerDescription:
    " Tamayoz was founded as a Saudi-Egyptian developer in 2008 after setting up a series of real estate projects in Saudi Arabia, such as the University of Al-Batrash and Sheikh Khalid Abd El Aziz University. With its experience, it was able to create a successful set of projects in the Egyptian market.",
  image: "/images/img1.png",
};

// Static amenities data
const staticAmenities = [
  { label: "Swimming Pool" },
  { label: "Gym" },
  { label: "Parking" },
  { label: "Garden" },
  { label: "Security" },
  { label: "Wi-Fi" },
  { label: "Elevator" },
];

const Page = () => {
  const searchParams = useSearchParams();
  const unitId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] = useState(fallbackPropertyData);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>(
    fallbackProjectDetails
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!unitId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch unit data to get project_id
        const unitResponse = await unitService.getUnit(Number(unitId));
        const unit = unitResponse.data;

        // Create property details from unit data
        if (unit) {
          const newPropertyData = [
            { label: "Unit Code", value: `U${unit.id}` },
            { label: "Unit Type", value: unit.unit_type || "Apartment" },
            { label: "Area", value: `${unit.unit_area} sqm` },
            {
              label: "Delivery",
              value: new Date(unit.expected_delivery_date)
                .getFullYear()
                .toString(),
            },
            { label: "Payment Option", value: "Installments" },
          ];
          setPropertyData(newPropertyData);

          // Try to fetch project data if we have project_id
          try {
            if (unit.project_id) {
              const projectResponse = await projectService.getProject(
                unit.project_id
              );
              if (projectResponse && projectResponse.data) {
                const project = projectResponse.data;

                // Update project details
                setProjectDetails({
                  id: project.id || 1,
                  developerName: project.developer_name || "Developer",
                  description:
                    project.description || fallbackProjectDetails.description,
                  developerDescription:
                    project.developer_description ||
                    fallbackProjectDetails.developerDescription,
                  image: project.image || "/images/nour.png",
                });
              }
            }
          } catch (projectError) {
            console.error("Error fetching project details:", projectError);
            // Keep using fallback project details
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        toast.error("Could not load complete property information");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [unitId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-xl">Loading property details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p className="font-bold">Notice</p>
          <p>
            Could not load all property information from API. Some sample data
            is being shown.
          </p>
        </div>
      )}

      <UnitDetails />
      <div className="flex flex-col justify-between lg:flex-row gap-6">
        <div className="flex-1">
          <ProjectDetailsComponent project={projectDetails} />
          <PropertyDetails details={propertyData} />
          {/* Add the amenities section */}
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <AmenityList />
          </div>
        </div>
        <div className="w-full lg:w-[25%]">
          <UserForm unitId={unitId ? Number(unitId) : undefined} />
        </div>
      </div>
    </div>
  );
};

export default Page;
