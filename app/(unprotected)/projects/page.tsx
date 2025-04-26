"use client";
import React, { useEffect, useState } from 'react';
import { projectService } from '@/lib/api';
import Header from '@/app/_components/header/Header';
import Footer from '@/app/_components/footer/Footer';
import { Project } from '@/app/_components/_types/ProjectType';
import ProjectsGrid from '@/app/_components/projectsCard/projectsGrid';
import { toast } from 'sonner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback projects in case API fails
  const fallbackProjects: Project[] = [
    {
      id: 1,
      title: "New Cairo",
      count: 8,
      image: "/images/c1.png",
      link: "/projects/new-cairo",
    },
    {
      id: 2,
      title: "Future City",
      count: 2,
      image: "/images/c2.png",
      link: "/projects/future-city",
    },
    {
      id: 3,
      title: "Sheikh Zayed",
      count: 1,
      image: "/images/c3.png",
      link: "/projects/sheikh-zayed",
    },
    {
      id: 4,
      title: "Cairo Gate",
      count: 4,
      image: "/images/c1.png",
      link: "/projects/cairo-gate",
    },
    {
      id: 5,
      title: "October Gardens",
      count: 6,
      image: "/images/c2.png",
      link: "/projects/october-gardens",
    },
    {
      id: 6,
      title: "Madinaty",
      count: 3,
      image: "/images/c3.png",
      link: "/projects/madinaty",
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await projectService.getProjects();
        
        if (response?.data && response.data.length > 0) {
          // Map API data to UI format
          const mappedProjects: Project[] = response.data.map((project, index) => {
            // Extract city name from project name if possible
            let title = project.name;
            
            return {
              id: index + 1,
              title: title,
              count: Math.floor(Math.random() * 10) + 1, // Random count since API doesn't provide this
              image: `/images/c${(index % 3) + 1}.png`, // Cycle through available images
              link: `/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`,
            };
          });
          
          setProjects(mappedProjects);
        } else {
          // Use fallback data if API returns empty
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Could not load projects from API");
        // Use fallback data on error
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Our Projects</h1>
        
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-xl">Loading projects...</p>
          </div>
        ) : (
          <>
            <ProjectsGrid projects={projects.length > 0 ? projects : fallbackProjects} />
            
            <div className="bg-white p-6 rounded-lg shadow-md my-8">
              <h2 className="text-xl font-bold mb-4">About Our Projects</h2>
              <p className="text-gray-700 mb-4">
                Our real estate projects are designed with the highest standards of quality and comfort in mind. 
                We work with leading architects and developers to create living spaces that combine modern design, 
                sustainable practices, and community-focused amenities.
              </p>
              <p className="text-gray-700">
                Each project is unique and carefully planned to meet the needs of different lifestyles and preferences. 
                Explore our projects above to find your perfect home.
              </p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
