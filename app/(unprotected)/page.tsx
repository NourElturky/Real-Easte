"use client";
import React, { useEffect, useState } from "react";
import { Unit } from "../_components/_types/CardTypes";
import Footer from "../_components/footer/Footer";
import Section from "../_components/unitCard/SectionWrapper";
import { Project } from "../_components/_types/ProjectType";
import ProjectsGrid from "../_components/projectsCard/projectsGrid";
import Header from "../_components/header/Header";

const Home: React.FC = () => {
  const [allUnits, setAllUnits] = useState<Unit[]>([]);
  const [rentUnits, setRentUnits] = useState<Unit[]>([]);
  const [saleUnits, setSaleUnits] = useState<Unit[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all units
        const unitsRes = await fetch('/api/units');
        const unitsData = await unitsRes.json();
        setAllUnits(unitsData);

        // Fetch units for rent
        const rentRes = await fetch('/api/units?status=For Rent');
        const rentData = await rentRes.json();
        setRentUnits(rentData);

        // Fetch units for sale
        const saleRes = await fetch('/api/units?status=For Sale');
        const saleData = await saleRes.json();
        setSaleUnits(saleData);

        // Fetch projects
        const projectsRes = await fetch('/api/projects');
        const projectsData = await projectsRes.json();
        setProjects(projectsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1F4B43]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto p-4 sm:p-6">
        <Header />
        <ProjectsGrid projects={projects} />

        <Section
          title="Discover Our Best Deals"
          units={allUnits}
          gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          itemsPerPage={6}
        />
        <Section
          title="Recent Properties for Rent"
          units={rentUnits}
          gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          itemsPerPage={4}
        />
        <Section
          title="Recent Properties for Sale"
          units={saleUnits}
          gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          itemsPerPage={4}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
