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
  // ... more units would be here in a real application
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const featured = searchParams.get('featured') === 'true';
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  
  let filteredUnits = units;
  
  // Filter by status if provided
  if (status) {
    filteredUnits = filteredUnits.filter(unit => unit.status === status);
  }
  
  // Filter by featured if requested
  if (featured) {
    filteredUnits = filteredUnits.filter(unit => unit.delivery === "Featured");
  }
  
  // Limit results if requested
  if (limit && limit > 0) {
    filteredUnits = filteredUnits.slice(0, limit);
  }
  
  return NextResponse.json(filteredUnits);
}
