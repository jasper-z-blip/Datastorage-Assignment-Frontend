import React from "react";
import { Link } from "react-router-dom";

const ProjectList = ({ projects, refreshProjects }) => {
    const sortedProjects = [...projects].sort((a, b) => {
        if (a.statusName === "Pågående") return -1;
        if (b.statusName === "Pågående") return 1;
        return 0;
    });

    return (
        <div className="ProjectList">
            <h2>Projektlista</h2>

            {sortedProjects.length > 0 ? (
                <ul>
                    {sortedProjects.map((project) => {
                        const statusText = project.status?.statusName || "Ingen status";
                        return (
                            <li className="ProjectInfo" key={project.id}>
                                <Link to={`/project/${project.id}`}>
                                    <strong>{project.projectNumber || "Ej tilldelat"}</strong> - {project.title}  
                                    <br />
                                    {project.startDate} → {project.endDate} 
                                    <br />
                                    <strong>Status:</strong> {statusText}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>Inga projekt tillagda.</p>
            )}
        </div>
    );
};

export default ProjectList;