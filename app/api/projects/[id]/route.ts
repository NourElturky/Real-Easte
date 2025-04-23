import { NextResponse } from 'next/server';
import { Project } from '@/app/_components/_types/ProjectType';
import { ProjectDetails } from '@/app/_components/_types/ProjectDetails';

// Sample data - in a real application, this would come from a database
const projects: Project[] = [
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
    title: "Shekh Zayid",
    count: 1,
    image: "/images/c3.png",
    link: "/projects/shekh-zayid",
  },
];

// Project details data
const projectDetails: { [key: number]: ProjectDetails } = {
  1: {
    id: 1,
    developerName: "Cairo Development",
    description: "New Cairo is a modern and luxurious residential complex located in the heart of Cairo. It offers a wide range of properties from apartments to villas, with world-class amenities and services.",
    developerDescription: "Cairo Development is a leading real estate developer in Egypt, known for creating modern, sustainable, and high-quality residential and commercial projects.",
    image: "/images/new-cairo.png",
  },
  2: {
    id: 2,
    developerName: "Future Developments",
    description: "Future City is an innovative residential complex designed for modern living with smart home features, sustainable architecture, and abundant green spaces.",
    developerDescription: "Future Developments specializes in creating forward-thinking residential communities with a focus on sustainability and technology integration.",
    image: "/images/future.png",
  },
  3: {
    id: 3,
    developerName: "Zayid Estates",
    description: "Shekh Zayid offers luxurious villas and apartments in a gated community with 24/7 security, swimming pools, gym facilities, and beautiful landscaped gardens.",
    developerDescription: "Zayid Estates has been developing premium residential properties in Egypt for over 20 years, with a reputation for quality and excellence.",
    image: "/images/shekh-zayed.png",
  },
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return NextResponse.json(
      { message: "Project not found" },
      { status: 404 }
    );
  }
  
  // Get additional project details
  const details = projectDetails[id];
  if (!details) {
    return NextResponse.json(
      { message: "Project details not found" },
      { status: 404 }
    );
  }
  
  // Combine project info with project details
  const fullProjectDetails = { ...project, ...details };
  
  return NextResponse.json(fullProjectDetails);
}
