import React from "react";
import { Unit } from "../_types/CardTypes";
import UnitCard from "./unitCard";

interface UnitGridProps {
  units: Unit[];
  title?: string;
  gridColumns?: string;
  hideTitle?: boolean;
}

const UnitGrid: React.FC<UnitGridProps> = ({ units, title, gridColumns, hideTitle = false }) => {
  return (
    <div>
      {!hideTitle && (
        <>
          {title && (
            <p className="text-center mb-1 text-[20px] sm:text-[30px] font-semibold">
              {title}
            </p>
          )}
          <p className="text-sm mb-6 text-center text-gray-500">
            Browse our selection of properties.
          </p>
        </>
      )}
      <div className={`grid ${gridColumns || "grid-cols-1"} gap-6`}>
        {units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
      
      {units.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No properties found.
        </div>
      )}
    </div>
  );
};

export default UnitGrid;
