import { NextResponse } from 'next/server';
import { Project } from '@/app/_components/_types/ProjectType';

// Sample data - in a real application, this would come from a database
const projects: Project[] = [
  {
    id: 1,
    title: "New Cairo",
    count: 9,
    image: "/images/new-cairo.png",
    link: "/projects/new-cairo",
  },
  {
    id: 2,
    title: "Future City",
    count: 8,
    image: "/images/future.png",
    link: "/projects/future-city",
  },
  {
    id: 3,
    title: "Shekh Zayid",
    count: 10,
    image: "/images/shekh-zayed.png",
    link: "/projects/shekh-zayid",
  },
];

export async function GET() {
  return NextResponse.json(projects);
}
