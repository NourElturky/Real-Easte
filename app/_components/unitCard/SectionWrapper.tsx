"use client";
import React, { useState } from "react";
import { Unit } from "../_types/CardTypes";
import UnitGrid from "./unitGrid";
import { LeftArrowIcon, RightArrowIcon } from "../svgs";

interface SectionProps {
  title: string;
  units: Unit[];
  gridColumns?: string;
  itemsPerPage: number;
  hideTitle?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  units,
  gridColumns,
  itemsPerPage,
  hideTitle = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(units.length / itemsPerPage);

  const currentUnits = units.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mb-10">
      <UnitGrid 
        title={title} 
        units={currentUnits} 
        gridColumns={gridColumns} 
        hideTitle={hideTitle}
      />

      {totalPages > 1 && (
        <div className="flex justify-center gap-6 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-2 bg-gray-200 rounded-full disabled:opacity-50"
            aria-label="Previous page"
          >
            <LeftArrowIcon />
          </button>

          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-2 bg-gray-200 rounded-full disabled:opacity-50"
            aria-label="Next page"
          >
            <RightArrowIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Section;
