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

// Extended unit details for the details page
const unitDetails: { [key: number]: any } = {
  1: {
    name: "Skyper Pool Apartment",
    price: "280,000",
    downPayment: "56,000",
    monthlyPayment: "2,500",
    rooms: 4,
    baths: 2,
    size: 450,
    images: [
      "/images/img1.png",
      "/images/img2.png",
      "/images/img3.png",
      "/images/img6.png",
    ],
    description: "A luxurious apartment with a beautiful view and modern amenities.",
    propertyDetails: [
      { label: "Property ID", value: "HZ29" },
      { label: "Property Type", value: "Apartment" },
      { label: "Property Status", value: "For Sale" },
      { label: "Property Price", value: "$280,000" },
      { label: "Rooms", value: "4" },
      { label: "Bedrooms", value: "3" },
      { label: "Bath", value: "2" },
      { label: "Garages", value: "1" },
      { label: "Year Built", value: "2018" },
      { label: "Area", value: "450 sq ft" },
      { label: "Payment Option", value: "Cash, Bank Loan" },
    ],
  },
  2: {
    name: "North Dillard Street",
    price: "3,000",
    downPayment: "6,000",
    monthlyPayment: "250",
    rooms: 4,
    baths: 2,
    size: 400,
    images: [
      "/images/img2.png",
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png",
    ],
    description: "A spacious apartment for rent in a prime location with all modern amenities.",
    propertyDetails: [
      { label: "Property ID", value: "HZ30" },
      { label: "Property Type", value: "Apartment" },
      { label: "Property Status", value: "For Rent" },
      { label: "Property Price", value: "$250/month" },
      { label: "Rooms", value: "4" },
      { label: "Bedrooms", value: "3" },
      { label: "Bath", value: "2" },
      { label: "Garages", value: "1" },
      { label: "Year Built", value: "2020" },
      { label: "Area", value: "400 sq ft" },
      { label: "Payment Option", value: "Cash, Monthly Installment" },
    ],
  },
  // ... more unit details would be here in a real application
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const unit = units.find(u => u.id === id);
  
  if (!unit) {
    return NextResponse.json(
      { message: "Unit not found" },
      { status: 404 }
    );
  }
  
  // Combine basic unit info with detailed info
  const details = unitDetails[id] || {};
  const fullUnitDetails = { ...unit, ...details };
  
  return NextResponse.json(fullUnitDetails);
}
