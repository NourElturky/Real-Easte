import { NextResponse } from 'next/server';
import { Project } from '@/app/_components/_types/ProjectType';

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

export async function GET() {
  return NextResponse.json(projects);
}
