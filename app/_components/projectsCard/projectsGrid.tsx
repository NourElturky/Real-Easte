import React from "react";
import ProjectsCard from "./projectsCard";
import { Project } from "../_types/ProjectType";

interface PropertyCardGridProps {
    projects: Project[];
}

const ProjectsGrid: React.FC<PropertyCardGridProps> = ({ projects }) => {
    return (
        <section className="py-16">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-medium text-center">
                    Explore Our projects
                </h2>
                <p className="text-black">Lorem ipsum dolor sit amet</p>
            </div>

            <div className="grid grid-cols-4 gap-6 px-4">
                {projects.map((project, index) => (
                    <ProjectsCard
                        key={project.id}
                        project={project}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProjectsGrid;
