"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
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
import SearchForm from "../search/SearchForm";

const Header = () => {
  const { status } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"sale" | "rent">("sale");
  const [selectedType, setSelectedType] = useState<string>("Type");
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [keyword, setKeyword] = useState("");

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const [filters, setFilters] = useState({
    bathrooms: "",
    bedrooms: "",
    minArea: "",
    maxArea: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleQuickSearch = () => {
    const status = activeTab === "sale" ? "For Sale" : "For Rent";
    router.push(`/search?status=${status}&keyword=${keyword}`);
  };

  const toggleAdvancedSearch = () => {
    setShowSearchForm(!showSearchForm);
  };

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
            <Link href="/">Home</Link>
            <Link href="/project">Projects</Link>
            <Link href="/about-us">About Us</Link>
          </div>
          <div className="text-[16px] font-semibold flex items-center space-x-2">
            <LogoIcon />
            <span>YourHome</span>
          </div>

          {status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 border border-gray-700 px-8 py-2 rounded-lg text-xs font-semibold"
            >
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 border border-gray-700 px-8 py-2 rounded-lg text-xs font-semibold"
            >
              <span>Login</span>
            </button>
          )}
        </nav>
        <Separator className="mt-4" />

        {/* Hero Section */}
        <section className="py-16 text-center">
  <h1 className="text-xl font-semibold mb-4">
    The <span className="text-[#1F4B43]">#1</span> platform future homeowners trust
  </h1>
  <p className="text-gray-600 mb-6">
    Explore top properties, compare options, and invest smarter — all in one place.
  </p>
</section>


        {/* Simple Search Bar */}
        <div className="flex items-center p-2 rounded-full space-x-2 w-1/2 justify-center mx-auto bg-white">
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
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button 
            className="border shadow-sm text-[#1F4B43] px-4 py-2 rounded-full"
            onClick={toggleAdvancedSearch}
          >
            Filter
          </button>

          <button 
            className="bg-[#1F4B43] text-white px-4 py-2 rounded-full"
            onClick={handleQuickSearch}
          >
            Search
          </button>
        </div>

        {/* Advanced Search Form */}
        {showSearchForm && <SearchForm />}
      </header>
    </>
  );
};

export default Header;
