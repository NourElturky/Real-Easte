import React from "react";
import { PropertyCard } from "../_types/PropertyCard";

interface PropertyCardGridProps {
    properties: PropertyCard[];
}

const PropertyGrid: React.FC<PropertyCardGridProps> = ({ properties }) => {
    return (
        <section className="py-16">
            <div className="text-center mb-8">
                <h2
                    className="text-4xl font-medium text-center"
                    style={{
                        fontFamily: "Roboto",
                        fontSize: "40px",
                        fontWeight: "500",
                        lineHeight: "52px",
                        textDecoration: "none",
                        textUnderlinePosition: "from-font",
                    }}
                >
                    Explore Our Properties
                </h2>
                <p
                    className="text-black"
                    style={{
                        fontFamily: "Roboto",
                        fontSize: "17px",
                        fontWeight: "400",
                        lineHeight: "32.3px",
                        textAlign: "center",
                        textDecoration: "none",
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                    }}
                >
                    Lorem ipsum dolor sit amet
                </p>
            </div>

            <div className="grid grid-cols-4 gap-6 px-4">
                {properties[0] && (
                    <a
                        href={properties[0].link}
                        key={properties[0].id}
                        className="relative rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-2 h-[395px]"
                    >
                        <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.1) 60%, rgba(0, 0, 0, 0) 100%)",
                            }}
                        />
                        <img
                            src={properties[0].image}
                            alt={properties[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                            className="absolute top-0 left-0 mt-[45px] ml-[50px] text-white"
                            style={{
                                fontFamily: "Roboto",
                                fontSize: "15px",
                                fontWeight: "400",
                                lineHeight: "28.5px",
                                textAlign: "left",
                                textDecoration: "none",
                                textUnderlinePosition: "from-font",
                            }}
                        >
                            <p style={{ color: "rgba(255, 255, 255, 1)" }}>
                                {properties[0].count} Properties
                            </p>
                            <p
                                style={{
                                    fontFamily: "Roboto",
                                    fontSize: "21px",
                                    fontWeight: "500",
                                    lineHeight: "25.2px",
                                    textAlign: "left",
                                }}
                            >
                                {properties[0].title}
                            </p>
                        </div>
                    </a>
                )}

                {properties[1] && (
                    <a
                        href={properties[1].link}
                        key={properties[1].id}
                        className="relative rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 h-[395px]"
                    >
                        <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.1) 60%, rgba(0, 0, 0, 0) 100%)",
                            }}
                        />
                        <img
                            src={properties[1].image}
                            alt={properties[1].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                            className="absolute top-0 left-0 mt-[45px] ml-[50px] text-white"
                            style={{
                                fontFamily: "Roboto",
                                fontSize: "15px",
                                fontWeight: "400",
                                lineHeight: "28.5px",
                                textAlign: "left",
                                textDecoration: "none",
                                textUnderlinePosition: "from-font",
                            }}
                        >
                            <p style={{ color: "rgba(255, 255, 255, 1)" }}>
                                {properties[1].count} Properties
                            </p>
                            <p
                                style={{
                                    fontFamily: "Roboto",
                                    fontSize: "21px",
                                    fontWeight: "500",
                                    lineHeight: "25.2px",
                                    textAlign: "left",
                                }}
                            >
                                {properties[1].title}
                            </p>
                        </div>
                    </a>
                )}

                {properties[2] && (
                    <a
                        href={properties[2].link}
                        key={properties[2].id}
                        className="relative rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 h-[395px]"
                    >
                        <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.1) 60%, rgba(0, 0, 0, 0) 100%)",
                            }}
                        />
                        <img
                            src={properties[2].image}
                            alt={properties[2].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                            className="absolute top-0 left-0 mt-[45px] ml-[50px] text-white"
                            style={{
                                fontFamily: "Roboto",
                                fontSize: "15px",
                                fontWeight: "400",
                                lineHeight: "28.5px",
                                textAlign: "left",
                                textDecoration: "none",
                                textUnderlinePosition: "from-font",
                            }}
                        >
                            <p style={{ color: "rgba(255, 255, 255, 1)" }}>
                                {properties[2].count} Properties
                            </p>
                            <p
                                style={{
                                    fontFamily: "Roboto",
                                    fontSize: "21px",
                                    fontWeight: "500",
                                    lineHeight: "25.2px",
                                    textAlign: "left",
                                }}
                            >
                                {properties[2].title}
                            </p>
                        </div>
                    </a>
                )}
            </div>
        </section>
    );
};

export default PropertyGrid;
