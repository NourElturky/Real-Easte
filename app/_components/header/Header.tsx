"use client";
import { useState } from "react";
import { LogoIcon } from "../svgs";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const session = useSession();
  const router = useRouter();

  console.log({ session });
  const isAuthenticated = session.status !== "unauthenticated";
  const [activeTab, setActiveTab] = useState<"sale" | "rent">("sale");
  const [selectedType, setSelectedType] = useState<string>("Type");

  return (
    <>
      {/* Header */}
      <header
        className="bg-white shadow-md p-4 rounded-lg bg-cover h-full"
        style={{
          backgroundImage: "url('/images/home.png')",
        }}
      >
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex justify-start gap-4 px-8 text-xs font-semibold">
            <Link href="/home">Discover</Link>
            <Link href="/Projects">Projects</Link>
            <Link href="/Contact">Contact</Link>
          </div>
          <div className="text-[16px] font-semibold flex items-center space-x-2">
            <LogoIcon />
            <span>YourHome</span>
          </div>
          {!isAuthenticated && (
            <button
              onClick={() => router.push("/login")}
              className="flex items-end gap-2 border border-gray-700 px-8 py-2 rounded-lg text-xs font-semibold"
            >
              <span>Login</span>
            </button>
          )}
        </nav>
        <Separator className="mt-4" />
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="text-xl font-semibold mb-4">
            The <span className="text-blue-500">#1</span> site real estate
            professionals trust*
          </h1>
          <p className="text-gray-600 mb-6">
            From as low as $10 per day with limited-time offer discounts.
          </p>

          {/* Tabs for Sale & Rent */}
          <div className="flex justify-center space-x-6 mb-6">
            <button
              className={`pb-2 ${
                activeTab === "sale"
                  ? "border-b-2 border-bg-[#1F4B43] font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("sale")}
            >
              Sale
            </button>
            <button
              className={`pb-2 ${
                activeTab === "rent"
                  ? "border-b-2 border-bg-[#1F4B43] font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("rent")}
            >
              Rent
            </button>
          </div>
        </section>
        {/* Search Bar */}
        <div className="flex items-center  p-2 rounded-full space-x-2 w-1/2 justify-center mx-auto bg-white">
          {/* Dropdown instead of select */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full px-10 py-2 focus:outline-none hover:bg-white"
              >
                {selectedType}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuItem onClick={() => setSelectedType("Apartment")}>
                Apartment
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType("House")}>
                House
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType("Villa")}>
                Villa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            type="text"
            placeholder="Enter Keywords"
            className="p-2 border rounded-full flex-2 w-full focus:outline-none"
          />
          <button className="border shadow-sm text-bg-[#1F4B43] px-4 py-2 rounded-full">
            Filters
          </button>
          <button className="bg-[#1F4B43] text-white px-4 py-2 rounded-full">
            Search
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
