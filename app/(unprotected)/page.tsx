import React from "react";
import { Unit } from "../_components/_types/CardTypes";
import Footer from "../_components/footer/Footer";
import Section from "../_components/unitCard/SectionWrapper";
import { Project } from "../_components/_types/ProjectType";
import ProjectsGrid from "../_components/projectsCard/projectsGrid";
import Header from "../_components/header/Header";

const cardUnits: Unit[] = [
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
  {
    id: 3,
    location: "Eaton Garth Penthouse",
    address: "7722 18th Ave, Brooklyn",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$180,000",
    image: "/images/img3.png",
    status: "For Sale",
  },
  {
    id: 4,
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
    id: 5,
    location: "North Dillard Street",
    address: "4330 Bell Shoals Rd",
    bedrooms: 4,
    bathrooms: 2,
    area: 400,
    price: "$250/month",
    image: "/images/img2.png",
    status: "For Rent",
  },
  {
    id: 6,
    location: "Eaton Garth Penthouse",
    address: "7722 18th Ave, Brooklyn",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$180,000",
    image: "/images/img8.png",
    status: "For Sale",
    delivery: "Featured",
  },
  {
    id: 33,
    location: "Skyper Pool Apartment",
    address: "1020 Bloomingdale Ave",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$280,000",
    image: "/images/img4.png",
    status: "For Sale",
  },
  {
    id: 44,
    location: "North Dillard Street",
    address: "4330 Bell Shoals Rd",
    bedrooms: 4,
    bathrooms: 2,
    area: 400,
    price: "$250/month",
    image: "/images/img6.png",
    status: "For Rent",
    delivery: "Featured",
  },
  {
    id: 77,
    location: "Eaton Garth Penthouse",
    address: "7722 18th Ave, Brooklyn",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$180,000",
    image: "/images/img7.png",
    status: "For Sale",
  },
  {
    id: 88,
    location: "Skyper Pool Apartment",
    address: "1020 Bloomingdale Ave",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$280,000",
    image: "/images/img2.png",
    status: "For Sale",
  },
  {
    id: 20,
    location: "North Dillard Street",
    address: "4330 Bell Shoals Rd",
    bedrooms: 4,
    bathrooms: 2,
    area: 400,
    price: "$250/month",
    image: "/images/img6.png",
    status: "For Rent",
  },
  {
    id: 200,
    location: "Eaton Garth Penthouse",
    address: "7722 18th Ave, Brooklyn",
    bedrooms: 4,
    bathrooms: 2,
    area: 450,
    price: "$180,000",
    image: "/images/img3.png",
    status: "For Sale",
    delivery: "Featured",
  },
];

const rentProperties: Unit[] = [
  {
    id: 7,
    location: "New Apartment Nice View",
    address: "42 Avenue D, Brooklyn",
    bedrooms: 4,
    bathrooms: 1,
    area: 460,
    price: "$850/month",
    image: "/images/img4.png",
    status: "For Rent",
    delivery: "Featured",
  },
  {
    id: 8,
    location: "Villa Garden With Pool",
    address: "6822 Bay Pkwy, Brooklyn",
    bedrooms: 3,
    bathrooms: 1,
    area: 350,
    price: "$350/month",
    image: "/images/img5.png",
    status: "For Rent",
  },
  {
    id: 9,
    location: "Ely Parkway Apartment",
    address: "7203 20th Ave, Brooklyn",
    bedrooms: 4,
    bathrooms: 1,
    area: 560,
    price: "$5,800/month",
    image: "/images/img6.png",
    status: "For Rent",
    delivery: "Featured",
  },
  {
    id: 10,
    location: "Modern Elegant Apartment",
    address: "1458 W Taylor St",
    bedrooms: 4,
    bathrooms: 1,
    area: 300,
    price: "$590/month",
    image: "/images/img7.png",
    status: "For Rent",
  },
  {
    id: 1119,
    location: "New Apartment Nice View",
    address: "42 Avenue D, Brooklyn",
    bedrooms: 4,
    bathrooms: 1,
    area: 460,
    price: "$850/month",
    image: "/images/img8.png",
    status: "For Rent",
    delivery: "Featured",
  },
  {
    id: 28,
    location: "Villa Garden With Pool",
    address: "6822 Bay Pkwy, Brooklyn",
    bedrooms: 3,
    bathrooms: 1,
    area: 350,
    price: "$350/month",
    image: "/images/img3.png",
    status: "For Rent",
  },
  {
    id: 90,
    location: "Ely Parkway Apartment",
    address: "7203 20th Ave, Brooklyn",
    bedrooms: 4,
    bathrooms: 1,
    area: 560,
    price: "$5,800/month",
    image: "/images/img1.png",
    status: "For Rent",
    delivery: "Featured",
  },
  {
    id: 130,
    location: "Modern Elegant Apartment",
    address: "1458 W Taylor St",
    bedrooms: 4,
    bathrooms: 1,
    area: 300,
    price: "$590/month",
    image: "/images/img5.png",
    status: "For Rent",
  },
];

const saleProperties: Unit[] = [
  {
    id: 11,
    location: "New Apartment Nice View",
    address: "42 Avenue D, Brooklyn",
    bedrooms: 4,
    bathrooms: 1,
    area: 460,
    price: "$850/month",
    image: "/images/img5.png",
    status: "For Sale",
  },
  {
    id: 12,
    location: "Villa Garden With Pool",
    address: "6822 Bay Pkwy, Brooklyn",
    bedrooms: 3,
    bathrooms: 1,
    area: 350,
    price: "$350/month",
    image: "/images/img7.png",
    status: "For Sale",
    delivery: "Featured",
  },
  {
    id: 13,
    location: "Ely Parkway Apartment",
    address: "7203 20th Ave, Brooklyn",
    bedrooms: 4,
    bathrooms: 1,
    area: 560,
    price: "$5,800/month",
    image: "/images/img8.png",
    status: "For Sale",
  },
  {
    id: 14,
    location: "Modern Elegant Apartment",
    address: "1458 W Taylor St",
    bedrooms: 4,
    bathrooms: 1,
    area: 300,
    price: "$590/month",
    image: "/images/img6.png",
    status: "For Sale",
    delivery: "Featured",
  },
  {
    id: 121,
    location: "New Apartment Nice View",
    address: "42 Avenue D, Brooklyn",
    bedrooms: 4,
    bathrooms: 1,
    area: 460,
    price: "$850/month",
    image: "/images/img1.png",
    status: "For Sale",
  },
  {
    id: 122,
    location: "Villa Garden With Pool",
    address: "6822 Bay Pkwy, Brooklyn",
    bedrooms: 3,
    bathrooms: 1,
    area: 350,
    price: "$350/month",
    image: "/images/img3.png",
    status: "For Sale",
    delivery: "Featured",
  },
  {
    id: 123,
    location: "Ely Parkway Apartment",
    address: "7203 20th Ave, Brooklyn",
    bedrooms: 4,
    bathrooms: 1,
    area: 560,
    price: "$5,800/month",
    image: "/images/img2.png",
    status: "For Sale",
  },
  {
    id: 124,
    location: "Modern Elegant Apartment",
    address: "1458 W Taylor St",
    bedrooms: 4,
    bathrooms: 1,
    area: 300,
    price: "$590/month",
    image: "/images/img7.png",
    status: "For Sale",
    delivery: "Featured",
  },
];
const projects: Project[] = [
  {
    id: 1,
    title: "New York",
    count: 8,
    image: "/images/c1.png",
    link: "/projects/new-york",
  },
  {
    id: 2,
    title: "Chicago",
    count: 2,
    image: "/images/c2.png",
    link: "/projects/chicago",
  },
  {
    id: 3,
    title: "Los Angeles",
    count: 1,
    image: "/images/c3.png",
    link: "/projects/los-angeles",
  },
];

const Home: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto p-4 sm:p-6">
        <Header />
        <ProjectsGrid projects={projects} />

        <Section
          title="Discover Our Best Deals"
          units={cardUnits}
          gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          itemsPerPage={6}
        />
        <Section
          title="Recent Properties for Rent"
          units={rentProperties}
          gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          itemsPerPage={4}
        />
        <Section
          title="Recent Properties for Sale"
          units={saleProperties}
          gridColumns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          itemsPerPage={4}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
