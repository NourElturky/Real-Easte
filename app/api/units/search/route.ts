import { NextResponse } from 'next/server';
import { Unit } from '@/app/_components/_types/CardTypes';

// Sample data - in a real application, this would come from a database
const units: Unit[] = [
  {
    id: 1,
    location: "Skyper Pool Apartment",
    address: "1020 Bloomingdale Ave",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$280,000",
    image: "/images/img1.png",
    status: "For Sale",
  },
  {
    id: 2,
    location: "North Dillard Street",
    address: "4330 Bell Shoals Rd",
    bedrooms: 4,
    bathrooms: 2,
    area: 400,
    price: "$250/month",
    image: "/images/img2.png",
    status: "For Rent",
    delivery: "Featured",
  },
  // Add more sample data as needed
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const status = searchParams.get('status');
  const minBedrooms = searchParams.get('minBedrooms') ? parseInt(searchParams.get('minBedrooms')!) : undefined;
  const minBathrooms = searchParams.get('minBathrooms') ? parseInt(searchParams.get('minBathrooms')!) : undefined;
  const minArea = searchParams.get('minArea') ? parseInt(searchParams.get('minArea')!) : undefined;
  const maxArea = searchParams.get('maxArea') ? parseInt(searchParams.get('maxArea')!) : undefined;
  const featured = searchParams.get('featured') === 'true';
  const keyword = searchParams.get('keyword')?.toLowerCase();
  
  let filteredUnits = [...units];
  
  // Filter by status if provided
  if (status) {
    filteredUnits = filteredUnits.filter(unit => unit.status === status);
  }
  
  // Filter by minimum bedrooms if provided
  if (minBedrooms !== undefined) {
    filteredUnits = filteredUnits.filter(unit => unit.bedrooms >= minBedrooms);
  }
  
  // Filter by minimum bathrooms if provided
  if (minBathrooms !== undefined) {
    filteredUnits = filteredUnits.filter(unit => unit.bathrooms >= minBathrooms);
  }
  
  // Filter by minimum area if provided
  if (minArea !== undefined) {
    filteredUnits = filteredUnits.filter(unit => unit.area >= minArea);
  }
  
  // Filter by maximum area if provided
  if (maxArea !== undefined) {
    filteredUnits = filteredUnits.filter(unit => unit.area <= maxArea);
  }
  
  // Filter by featured if requested
  if (featured) {
    filteredUnits = filteredUnits.filter(unit => unit.delivery === "Featured");
  }
  
  // Filter by keyword if provided (searches in location and address)
  if (keyword) {
    filteredUnits = filteredUnits.filter(unit => 
      unit.location.toLowerCase().includes(keyword) || 
      unit.address.toLowerCase().includes(keyword)
    );
  }
  
  return NextResponse.json(filteredUnits);
}
