"use client";
import React, { useEffect, useState } from 'react';
import { projectService, unitService } from '@/lib/api';
import Header from '@/app/_components/header/Header';
import Footer from '@/app/_components/footer/Footer';
import { Unit } from '@/app/_components/_types/CardTypes';
import Section from '@/app/_components/unitCard/SectionWrapper';
import Image from 'next/image';
import { toast } from 'sonner';

interface ProjectDetails {
  name: string;
  description: string;
  developer_name?: string;
  developer_description?: string;
  image?: string;
  units?: Unit[];
}

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [projectUnits, setProjectUnits] = useState<Unit[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        // Convert slug to project name format (e.g., "cairo-gate" to "Cairo Gate")
        const projectName = params.slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        console.log(`Searching for project with name like: ${projectName}`);
        
        // Try to fetch the project using slug
        const matchingProject = await projectService.getProjectBySlug(params.slug);
        
        if (matchingProject) {
          console.log("Found matching project:", matchingProject);
          setProject(matchingProject);
          
          // Try to fetch units for this project
          try {
            const unitsResponse = await unitService.getUnits();
            if (unitsResponse?.data && unitsResponse.data.length > 0) {
              // Map API units to UI format
              const mappedUnits = unitsResponse.data.map(apiUnit => {
                // Generate a price based on unit size
                const areaSize = parseInt(apiUnit.unit_area) || 100;
                const basePrice = areaSize * 1000;
                
                // Format price based on status
                const price = apiUnit.unit_status === "For Rent" 
                  ? `$${Math.round(basePrice / 200)}/month` 
                  : `$${basePrice.toLocaleString()}`;
                
                // Map locations based on type
                let address = matchingProject.name || "Egypt";
                
                return {
                  id: apiUnit.id,
                  location: apiUnit.unit_type || "Apartment",
                  address: address,
                  bedrooms: apiUnit.number_of_bedrooms || 0,
                  bathrooms: apiUnit.number_of_bathrooms || 0,
                  area: parseInt(apiUnit.unit_area) || 0,
                  price: price,
                  image: apiUnit.media && apiUnit.media.length > 0 
                    ? apiUnit.media[0].original_url 
                    : `/images/img${(apiUnit.id % 8) + 1}.png`,
                  status: apiUnit.unit_status === "For Rent" ? "For Rent" : "For Sale",
                  delivery: Math.random() > 0.7 ? "Featured" : undefined,
                };
              });
              
              // For demonstration, just display a sample of units
              // In a real implementation, you'd filter by project_id
              setProjectUnits(mappedUnits.slice(0, 6));
            }
          } catch (unitError) {
            console.error("Error fetching units for project:", unitError);
          }
        } else {
          // No matching project found
          console.log("No matching project found for slug:", params.slug);
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
        setError(true);
        toast.error("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjectDetails();
  }, [params.slug]);

  // Generate a fallback project if needed
  const fallbackProject: ProjectDetails = {
    name: params.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    description: "This is a premium residential project featuring modern architecture, green spaces, and comprehensive amenities for comfortable living.",
    developer_name: "Premium Developers",
    developer_description: "A leading real estate developer known for creating high-quality living spaces with innovative designs and sustainable features.",
    image: "/images/c1.png",
  };

  const displayProject = project || fallbackProject;

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto p-4 sm:p-6 text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-xl">Loading project details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 sm:p-6">
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            <p className="font-bold">Notice</p>
            <p>Could not find the requested project. Showing sample data instead.</p>
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <Image 
                  src={displayProject.image || "/images/c1.png"} 
                  alt={displayProject.name} 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h1 className="text-2xl font-bold mb-3">{displayProject.name}</h1>
              
              {displayProject.developer_name && (
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Developer:</span> {displayProject.developer_name}
                </p>
              )}
              
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Project Description</h2>
                <p className="text-gray-700">{displayProject.description}</p>
              </div>
              
              {displayProject.developer_description && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">About the Developer</h2>
                  <p className="text-gray-700">{displayProject.developer_description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Units in {displayProject.name}</h2>
        
        {projectUnits.length > 0 ? (
          <Section
            title=""
            units={projectUnits}
            gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            itemsPerPage={6}
            hideTitle
          />
        ) : (
          <div className="bg-gray-50 p-10 text-center rounded-lg">
            <p className="text-gray-600">No units are currently available in this project.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
