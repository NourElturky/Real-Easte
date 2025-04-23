"use client";
import React from "react";

import { Unit } from "../_components/_types/CardTypes";
import UnitCard from "../_components/unitCard/unitCard";
import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";

const units: Unit[] = [
  {
    id: 1,
    location: "Palm Hills New Cairo",
    address: "South 90th Street, New Cairo",
    bedrooms: 3,
    bathrooms: 2,
    area: 230,
    price: "EGP 4,500,000",
    image: "/images/img1.png",
    status: "For Sale",
  },
  {
    id: 2,
    location: "Zed Towers",
    address: "El Sheikh Zayed Entrance 1, Giza Governorate",
    bedrooms: 2,
    bathrooms: 1,
    area: 180,
    price: "EGP 25,000/month",
    image: "/images/img2.png",
    status: "For Rent",
    delivery: "Featured",
  },
  {
    id: 3,
    location: "Mountain View iCity",
    address: "Future City, New Cairo",
    bedrooms: 4,
    bathrooms: 3,
    area: 275,
    price: "EGP 6,200,000",
    image: "/images/img3.png",
    status: "For Sale",
  },
  {
    id: 4,
    location: "Beverly Hills Compound",
    address: "26th of July Corridor, Sheikh Zayed",
    bedrooms: 3,
    bathrooms: 2,
    area: 210,
    price: "EGP 3,950,000",
    image: "/images/img4.png",
    status: "For Sale",
  },
  {
    id: 5,
    location: "Villette Sodic",
    address: "Teseen Street, New Cairo",
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    price: "EGP 30,000/month",
    image: "/images/img5.png",
    status: "For Rent",
  },
  {
    id: 6,
    location: "Midtown Sky",
    address: "R7 Area, New Capital City",
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    price: "EGP 4,200,000",
    image: "/images/img6.png",
    status: "For Sale",
  },
  {
    id: 7,
    location: "Etapa Compound",
    address: "Al Bostan Area, Sheikh Zayed",
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    price: "EGP 7,100,000",
    image: "/images/img7.png",
    status: "For Sale",
  },
  {
    id: 8,
    location: "Bloomfields",
    address: "Mostakbal City, New Cairo",
    bedrooms: 2,
    bathrooms: 2,
    area: 160,
    price: "EGP 22,000/month",
    image: "/images/img8.png",
    status: "For Rent",
    delivery: "Featured",
  },
  {
    id: 9,
    location: "O West Compound",
    address: "Wahat Road, 6th of October",
    bedrooms: 3,
    bathrooms: 2,
    area: 240,
    price: "EGP 5,000,000",
    image: "/images/img1.png",
    status: "For Sale",
  },
  {
    id: 10,
    location: "The Estates Sodic",
    address: "Dahshur Link, Sheikh Zayed Extension",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    price: "EGP 10,500,000",
    image: "/images/img2.png",
    status: "For Rent",
    delivery: "Featured",
  },
  {
    id: 11,
    location: "La Vista City",
    address: "New Capital Ring Road",
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    price: "EGP 6,800,000",
    image: "/images/img3.png",
    status: "For Sale",
  },
  {
    id: 12,
    location: "Cairo Gate",
    address: "Dabaa Corridor, Sheikh Zayed",
    bedrooms: 3,
    bathrooms: 2,
    area: 210,
    price: "EGP 4,300,000",
    image: "/images/img4.png",
    status: "For Sale",
  },
  {
    id: 13,
    location: "Mivida Emaar",
    address: "South 90th Street, New Cairo",
    bedrooms: 2,
    bathrooms: 2,
    area: 170,
    price: "EGP 28,000/month",
    image: "/images/img5.png",
    status: "For Rent",
  },
  {
    id: 14,
    location: "The Loft",
    address: "R7 Zone, New Capital",
    bedrooms: 3,
    bathrooms: 2,
    area: 190,
    price: "EGP 4,000,000",
    image: "/images/img6.png",
    status: "For Sale",
  },
  {
    id: 15,
    location: "Casa Compound",
    address: "El Mehwar Road, Sheikh Zayed",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    price: "EGP 6,300,000",
    image: "/images/img7.png",
    status: "For Sale",
  },
  {
    id: 16,
    location: "Il Bosco City",
    address: "Mostakbal City, New Cairo",
    bedrooms: 2,
    bathrooms: 2,
    area: 165,
    price: "EGP 24,000/month",
    image: "/images/img8.png",
    status: "For Rent",
    delivery: "Featured",
  },
];

const ProjectsPage = () => {
  return (
    <div>
      <Header />
      <section className="py-10 px-4 md:px-16 bg-[#f8f8f8]">
        <h1 className="text-2xl font-bold mb-8 text-center text-[#1F4B43]">
          Explore Our Latest Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
