"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image";
import Header from '@/app/_components/header/Header';
import Footer from '@/app/_components/footer/Footer';
import ProjectDetailsComponent from '@/app/_components/ProjectDetailsComponent/ProjectDetailsComponent';
import Section from '@/app/_components/unitCard/SectionWrapper';
import { Unit } from '@/app/_components/_types/CardTypes';

interface ProjectDetailsData {
  id: number;
  title: string;
  count: number;
  image: string;
  link: string;
  developerName: string;
  description: string;
  developerDescription: string;
}

const ProjectDetailsPage = () => {
  const params = useParams();
  const [project, setProject] = useState<ProjectDetailsData | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Fetch project details
        const projectRes = await fetch(`/api/projects/${params.id}`);
        if (!projectRes.ok) {
          throw new Error('Failed to fetch project details');
        }
        const projectData = await projectRes.json();
        setProject(projectData);
        
        // In a real application, you would fetch units related to this project
        // For now, we'll fetch all units as a demo
        const unitsRes = await fetch('/api/units');
        if (!unitsRes.ok) {
          throw new Error('Failed to fetch units');
        }
        const unitsData = await unitsRes.json();
        setUnits(unitsData);

      } catch (err) {
        setError('Error loading project details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProjectData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1F4B43]"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto p-4 h-screen flex items-center justify-center">
        <div className="text-red-500">{error || 'Project not found'}</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <div className="relative w-full h-[30vh] md:h-[50vh] rounded-lg overflow-hidden mb-6">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h1 className="text-4xl text-white font-bold">{project.title}</h1>
            </div>
          </div>
          
          <ProjectDetailsComponent project={project} />
        </div>
        
        <Section
          title={`Properties in ${project.title}`}
          units={units}
          gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          itemsPerPage={6}
        />
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetailsPage;
