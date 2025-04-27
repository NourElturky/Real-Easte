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
import { SearchFilters } from "@/lib/api/searchService";

interface HeaderProps {
  onSearch?: (filters: SearchFilters) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { status } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"For Sale" | "For Rent">("For Sale");
  const [selectedType, setSelectedType] = useState<string>("Type");
  const [showFilters, setShowFilters] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({
    bathrooms: "",
    bedrooms: "",
    minArea: "",
    maxArea: "",
    minPrice: "",
    maxPrice: "",
  });

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    if (onSearch) {
      const searchFilters: SearchFilters = {
        keyword,
        unit_type: selectedType !== "Type" ? selectedType : undefined,
        status: activeTab as 'For Sale' | 'For Rent',
      };

      // Add numeric filters when they're set
      if (filters.bedrooms) searchFilters.min_bedrooms = parseInt(filters.bedrooms);
      if (filters.bathrooms) searchFilters.min_bathrooms = parseInt(filters.bathrooms);
      
      if (filters.minArea) searchFilters.min_area = parseInt(filters.minArea);
      if (filters.maxArea) searchFilters.max_area = parseInt(filters.maxArea);
      
      if (filters.minPrice) searchFilters.min_price = parseInt(filters.minPrice);
      if (filters.maxPrice) searchFilters.max_price = parseInt(filters.maxPrice);

      console.log("Searching with filters:", searchFilters);
      onSearch(searchFilters);
    } else {
      console.log("Search handler not provided");
    }
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
            <Link href="/">Discover</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
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
                activeTab === "For Sale"
                  ? "border-b-2 border-[#1F4B43] font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("For Sale")}
            >
              Sale
            </button>
            <button
              className={`pb-2 ${
                activeTab === "For Rent"
                  ? "border-b-2 border-[#1F4B43] font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("For Rent")}
            >
              Rent
            </button>
          </div>
        </section>

        {/* Search Bar */}
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
              <DropdownMenuItem onClick={() => setSelectedType("Villa")}>
                Villa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType("Duplex")}>
                Duplex
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType("Studio")}>
                Studio
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType("Type")}>
                Any Type
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            type="text"
            placeholder="Enter Keywords"
            className="p-2 border rounded-full flex-2 w-full focus:outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <DropdownMenu open={showFilters} onOpenChange={setShowFilters}>
            <DropdownMenuTrigger asChild className="focus:outline-none">
              <button className="border shadow-sm text-[#1F4B43] px-4 py-2 rounded-full">
                Filters
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 w-64 space-y-4">
              {["bathrooms", "bedrooms", "area", "price"].map((key) => (
                <div key={key} className="space-y-1">
                  <p className="text-xs capitalize text-gray-500">{key}</p>

                  {/* Area Range */}
                  {key === "area" ? (
                    <div className="flex gap-2">
                      {/* Min Area */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-xs">
                            {filters.minArea || "Min Area"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {[50, 75, 100, 125, 150, 175, 200, 250, 300].map((size) => (
                            <DropdownMenuItem
                              key={`min-area-${size}`}
                              onClick={() => updateFilter("minArea", size.toString())}
                            >
                              {size} m²
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Max Area */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-xs">
                            {filters.maxArea || "Max Area"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {[100, 150, 200, 250, 300, 350, 400, 450, 500].map((size) => (
                            <DropdownMenuItem
                              key={`max-area-${size}`}
                              onClick={() => updateFilter("maxArea", size.toString())}
                            >
                              {size} m²
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : key === "price" ? (
                    // Keep the existing price range code here
                    <div className="flex gap-2">
                      {/* Min Price Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-xs">
                            {filters.minPrice || "Min Price"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mil) => (
                            <DropdownMenuItem
                              key={`min-${mil}`}
                              onClick={() => updateFilter("minPrice", (mil * 1_000_000).toString())}
                            >
                              {mil}M EGP
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Max Price Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-xs">
                            {filters.maxPrice || "Max Price"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((mil) => (
                            <DropdownMenuItem
                              key={`max-${mil}`}
                              onClick={() => updateFilter("maxPrice", (mil * 1_000_000).toString())}
                            >
                              {mil}M EGP
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    // Bathrooms / Bedrooms
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          {filters[key as keyof typeof filters] || `Select ${key}`}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {[1, 2, 3, 4, 5, 6].map((value) => (
                          <DropdownMenuItem
                            key={value}
                            onClick={() => updateFilter(key as keyof typeof filters, value.toString())}
                          >
                            {value}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button 
            className="bg-[#1F4B43] text-white px-4 py-2 rounded-full hover:bg-[#163b34] transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
