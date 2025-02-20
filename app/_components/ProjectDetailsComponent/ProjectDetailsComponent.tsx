import React from "react";
import Image from "next/image";
import { ProjectDetails } from "../_types/ProjectDetails";

const ProjectDetailsComponent: React.FC<{ project: ProjectDetails }> = ({ project }) => {
    return (
        <div className="max-w-4xl p-6">
            <h2 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">Description</h2>
            <p className="line-clamp mt-4 text-sm text-gray-500">{project.description}</p>
            <h2 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl mt-10">Developed By</h2>
            <div className="mt-6 mb-2 flex items-center space-x-4 lg:mb-5">
                <img src={project.image} alt={project.developerName} className="w-16 h-16 rounded-full shadow-md" />
                <div>
                    <h3 className="text-xl font-semibold">{project.developerName}</h3>
                    <p className="line-clamp mt-1 text-sm text-gray-500">{project.developerDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsComponent;