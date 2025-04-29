"use client";
import React, { useEffect, useState } from "react";
import { Unit } from "../_components/_types/CardTypes";
import Footer from "../_components/footer/Footer";
import Section from "../_components/unitCard/SectionWrapper";
import { Project } from "../_components/_types/ProjectType";
import ProjectsGrid from "../_components/projectsCard/projectsGrid";
import Header from "../_components/header/Header";
import { unitService, projectService } from "@/lib/api";
import { SearchFilters, searchService } from "@/lib/api/searchService";
import { toast } from "sonner";

type ApiUnit = {
  id: number;
  unit_type?: string;
  unit_area: string;
  number_of_bedrooms?: number;
  number_of_bathrooms?: number;
  unit_status: string;
  media?: { original_url: string }[];
};

const forRent :Unit[]=[
  {
    id: 1,
    location: "Skyper Pool Apartment",
    address: "New Cairo, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$280,000",
    image: "/images/img1.png",
    status: "For Rent",
  },
  {
    id: 2,
    location: "North Dillard Street",
    address: "Sheikh Zayed, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 400,
    price: "$250/month",
    image: "/images/img2.png",
    status: "For Rent",
    delivery: "Featured",
  },
  {
    id: 3,
    location: "Eaton Garth Penthouse",
    address: "Maadi, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$180,000",
    image: "/images/img3.png",
    status: "For Rent",
  },
  {
    id: 4,
    location: "Skyper Pool Apartment",
    address: "Heliopolis, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$280,000",
    image: "/images/img4.png",
    status: "For Rent",
  },
  {
    id: 5,
    location: "North Dillard Street",
    address: "October City, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 400,
    price: "$250/month",
    image: "/images/img5.png",
    status: "For Rent",
  },
  {
    id: 6,
    location: "Eaton Garth Penthouse",
    address: "Nasr City, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$180,000",
    image: "/images/img6.png",
    status: "For Rent",
    delivery: "Featured",
  },
]
// Fallback data in case API fails
const fallbackUnits: Unit[] = [
  {
    id: 1,
    location: "Skyper Pool Apartment",
    address: "New Cairo, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$280,000",
    image: "/images/img1.png",
    status: "For Rent",
  },
  {
    id: 2,
    location: "North Dillard Street",
    address: "Sheikh Zayed, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 400,
    price: "$250/month",
    image: "/images/img2.png",
    status: "For Rent",
    delivery: "Featured",
  },
  {
    id: 3,
    location: "Eaton Garth Penthouse",
    address: "Maadi, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$180,000",
    image: "/images/img3.png",
    status: "For Rent",
  },
  {
    id: 4,
    location: "Skyper Pool Apartment",
    address: "Heliopolis, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$280,000",
    image: "/images/img4.png",
    status: "For Rent",
  },
  {
    id: 5,
    location: "North Dillard Street",
    address: "October City, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 400,
    price: "$250/month",
    image: "/images/img5.png",
    status: "For Rent",
  },
  {
    id: 6,
    location: "Eaton Garth Penthouse",
    address: "Nasr City, Egypt",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$180,000",
    image: "/images/img6.png",
    status: "For Rent",
    delivery: "Featured",
  },
];

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "New Cairo",
    count: 10,
    image: "/images/new-cairo.png",
    link: "/projects/new-cairo",
  },
  {
    id: 2,
    title: "Future City",
    count: 10,
    image: "/images/shekh-zayed.png",
    link: "/projects/future-city",
  },
  {
    id: 3,
    title: "Sheikh Zayed",
    count: 9,
    image: "/images/future.png",
    link: "/projects/sheikh-zayed",
  },
];

const Home: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [rentUnits, setRentUnits] = useState<Unit[]>([]);
  const [saleUnits, setSaleUnits] = useState<Unit[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(
    null
  );

  // Function to map API units to UI units
  const mapApiUnitsToUiUnits = (apiUnits: ApiUnit[]): Unit[] => {
    return apiUnits.map((apiUnit) => {
      // Generate a price based on unit size
      const areaSize = parseInt(apiUnit.unit_area) || 100;
      const basePrice = areaSize * 1000; // Simple formula: $1000 per square meter

      // Format price based on rental or sale
      const price =
        apiUnit.unit_status === "For Sale"
          ? `$${Math.round(basePrice / 200)}/month`
          : `$${basePrice.toLocaleString()}`;
      // Map locations based on type
      let address = "Egypt";
      if (apiUnit.unit_type?.toLowerCase().includes("villa")) {
        address = "New Cairo, Egypt";
      } else if (apiUnit.unit_type?.toLowerCase().includes("apartment")) {
        address = "Sheikh Zayed, Egypt";
      } else if (apiUnit.unit_type?.toLowerCase().includes("duplex")) {
        address = "Maadi, Egypt";
      }

      return {
        id: apiUnit.id,
        location: apiUnit.unit_type || "Apartment",
        address: address,
        bedrooms: apiUnit.number_of_bedrooms || 4,
        bathrooms: apiUnit.number_of_bathrooms || 2,
        area: parseInt(apiUnit.unit_area) || 250,
        price: price,
        image:
          apiUnit.media && apiUnit.media.length > 0
            ? apiUnit.media[0].original_url
            : `/images/img${(apiUnit.id % 8) + 1}.png`,
        status: apiUnit.unit_status === "For Sale" ? "For Rent" : "For Sale",
        delivery: Math.random() > 0.7 ? "Featured" : undefined,
      };
    });
  };

  // Initial data loading
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setApiError(false);

      try {
        console.log("Fetching initial data from API");

        // Fetch units from API
        const unitsResponse = await unitService.getUnits();

        console.log("Units API response:", unitsResponse);

        if (unitsResponse?.data && unitsResponse.data.length > 0) {
          const mappedUnits = mapApiUnitsToUiUnits(unitsResponse.data);

          setUnits(mappedUnits);

          // Filter units by status
          setRentUnits(
            mappedUnits.filter((unit) => unit.status === "For Rent")
          );
          setSaleUnits(
            mappedUnits.filter((unit) => unit.status === "For Sale")
          );
        } else {
          console.warn("No units data returned from API, using fallback data");
          setUnits(fallbackUnits);
          setRentUnits(
            fallbackUnits.filter((unit) => unit.status === "For Rent")
          );
          setSaleUnits(
            fallbackUnits.filter((unit) => unit.status === "For Sale")
          );
        }

        // Fetch projects from API
        try {
          console.log("Fetching projects from API");

          const projectsResponse = await projectService.getProjects();

          console.log("Projects API response:", projectsResponse);

          if (projectsResponse?.data && projectsResponse.data.length > 0) {
            // Map API data to UI format
            const mappedProjects: Project[] = projectsResponse.data.map(
              (project, index) => {
                // Extract city name from project name if possible
                let title = project.name;
                if (title.includes("Cairo")) {
                  title = "New Cairo";
                } else if (title.includes("Zayed")) {
                  title = "Sheikh Zayed";
                } else if (title.includes("Future")) {
                  title = "Future City";
                }
                const fallback = fallbackProjects[index];

                return {
                  id: index + 1,
                  title,
                  count: Math.floor(Math.random() * 10) + 5,
                  image: fallback?.image ?? "/images/future.png",
                  link: `/projects/${title.toLowerCase().replace(/\s+/g, "-")}`,
                };
              }
            );

            setProjects(mappedProjects);
          } else {
            console.warn(
              "No projects data returned from API, using fallback data"
            );
            setProjects(fallbackProjects);
          }
        } catch (projectError) {
          console.error("Error fetching projects:", projectError);
          // Fallback to default projects
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Could not connect to the API. Using sample data instead.");
        setApiError(true);

        // Use fallback data
        setUnits(fallbackUnits);
        setRentUnits(
          fallbackUnits.filter((unit) => unit.status === "For Rent")
        );
        setSaleUnits(
          fallbackUnits.filter((unit) => unit.status === "For Sale")
        );
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // Handle search function
  const handleSearch = async (filters: SearchFilters) => {
    setSearching(true);
    setSearchPerformed(true);
    setSearchFilters(filters);

    try {
      console.log("Searching with filters:", filters);

      const searchResults = await searchService.searchUnits(filters);

      if (searchResults?.data && searchResults.data.length > 0) {
        const mappedUnits = mapApiUnitsToUiUnits(searchResults.data);
        setUnits(mappedUnits);
        toast.success(
          `Found ${mappedUnits.length} units matching your criteria`
        );
      } else {
        setUnits([]);
        toast.info("No units found matching your search criteria");
      }
    } catch (error) {
      console.error("Error searching units:", error);
      toast.error("Error searching units. Please try again.");

      // Fallback to filter the existing units client-side
      const filteredUnits = units.filter((unit) => {
        let matches = true;

        if (filters.status && unit.status !== filters.status) {
          matches = false;
        }

        if (
          filters.unit_type &&
          !unit.location.toLowerCase().includes(filters.unit_type.toLowerCase())
        ) {
          matches = false;
        }

        if (
          filters.keyword &&
          !(
            unit.location
              .toLowerCase()
              .includes(filters.keyword.toLowerCase()) ||
            unit.address.toLowerCase().includes(filters.keyword.toLowerCase())
          )
        ) {
          matches = false;
        }

        if (filters.min_bedrooms && unit.bedrooms < filters.min_bedrooms) {
          matches = false;
        }

        if (filters.min_bathrooms && unit.bathrooms < filters.min_bathrooms) {
          matches = false;
        }

        if (filters.min_area && unit.area < filters.min_area) {
          matches = false;
        }

        if (filters.max_area && unit.area > filters.max_area) {
          matches = false;
        }

        return matches;
      });

      setUnits(filteredUnits);

      if (filteredUnits.length > 0) {
        toast.success(
          `Found ${filteredUnits.length} units matching your criteria (local search)`
        );
      } else {
        toast.info("No units found matching your search criteria");
      }
    } finally {
      setSearching(false);
    }
  };
  // Function to clear search and return to all listings
  const clearSearch = () => {
    setSearchPerformed(false);
    setSearchFilters(null);

    // Restore original units
    if (rentUnits.length > 0 || saleUnits.length > 0) {
      setUnits([...rentUnits, ...saleUnits]);
    } else {
      setUnits(fallbackUnits);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 sm:p-6">
        <Header onSearch={handleSearch} />

        {loading || searching ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-xl">
              {searching ? "Searching..." : "Loading properties..."}
            </p>
          </div>
        ) : (
          <>
            {apiError && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
                <p className="font-bold">Notice</p>
                <p>
                  Could not connect to the API. Showing sample data instead.
                </p>
              </div>
            )}

            {/* Search results section */}
            {searchPerformed && (
              <div className="mt-6 mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {units.length > 0
                      ? `Search Results (${units.length} properties found)`
                      : "No properties found matching your criteria"}
                  </h2>
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm transition"
                  >
                    Clear Search
                  </button>
                </div>

                {searchFilters && (
                  <div className="mt-2 mb-4 bg-gray-100 p-3 rounded-md text-sm">
                    <p className="font-semibold">Search filters:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {searchFilters.status && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {searchFilters.status}
                        </span>
                      )}
                      {searchFilters.unit_type && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Type: {searchFilters.unit_type}
                        </span>
                      )}
                      {searchFilters.keyword && (
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          {searchFilters.keyword}
                        </span>
                      )}
                      {searchFilters.min_bedrooms && (
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          Min {searchFilters.min_bedrooms} Bedrooms
                        </span>
                      )}
                      {searchFilters.min_bathrooms && (
                        <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                          Min {searchFilters.min_bathrooms} Bathrooms
                        </span>
                      )}
                      {searchFilters.min_area && (
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                          Min Area: {searchFilters.min_area} m²
                        </span>
                      )}
                      {searchFilters.max_area && (
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                          Max Area: {searchFilters.max_area} m²
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {units.length > 0 ? (
                  <Section
                    title=""
                    units={units}
                    gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    itemsPerPage={6}
                    hideTitle
                  />
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                      No properties found matching your search criteria.
                    </p>
                    <button
                      onClick={clearSearch}
                      className="mt-4 px-6 py-2 bg-[#1F4B43] text-white rounded-full hover:bg-[#163b34] transition"
                    >
                      View All Properties
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Regular content when no search is performed */}
            {!searchPerformed && (
              <>
                <ProjectsGrid
                  projects={projects.length > 0 ? projects : fallbackProjects}
                />

                <Section
                  title="Discover Our Best Deals"
                  units={units.length > 0 ? units : fallbackUnits}
                  gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  itemsPerPage={6}
                />

                  <Section
                    title="Recent Properties for Rent"
                    units={forRent}
                    gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    itemsPerPage={4}
                  />
                

                {saleUnits.length > 0 && (
                  <Section
                    title="Recent Properties for Sale"
                    units={saleUnits}
                    gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    itemsPerPage={4}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
