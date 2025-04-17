"use client";
import React from "react";
import Image from "next/image";
import { Project } from "../_types/ProjectType";
import { useRouter } from "next/navigation";

interface ProjectsCardProps {
  project: Project;
  index: number;
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({ project, index }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div
      onClick={handleClick}
      key={project.id}
      className={`relative rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
        index === 0 ? "col-span-2" : "col-span-1"
      } h-[395px]`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/10 to-transparent" />
      <Image
        width={300}
        height={300}
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-0 left-0 mt-[45px] ml-[50px] text-white">
        <p>{project.count} Properties</p>
        <p className="text-xl font-medium">{project.title}</p>
      </div>
    </div>
  );
};

export default ProjectsCard;
