import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../ProjectCard/ProjectCard";
import MyProjectDetails from "../MyProjectDetails/MyProjectDetails";


interface ProjectResponse {
  id: number;
  project_name: string;
  project_description: string;
  finance_objective: number;
  finance_collected: number;
  userId: number;
  imageData?: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectResponse | null>(null); // 🆕 selected project

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Token not found. Please log in again.");
          return;
        }
        const response = await axios.get("http://localhost:8082/api/projects/my", {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        });
        setProjects(response.data);
      } catch (err: any) {
        setError("Failed to fetch projects. Please try again later.");
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>{error}</div>;
  }

  return (
    <div className="projects-container">
      {selectedProject ? (
        <MyProjectDetails project={selectedProject} onBack={() => setSelectedProject(null)} />
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {projects.map((project) => (
            <div key={project.id} onClick={() => setSelectedProject(project)} style={{ flex: "1 1 300px" }}>
              <ProjectCard
                key={project.id}
                name={project.project_name}
                description={project.project_description}
                owner={`User ${project.userId}`}
                amount={project.finance_collected}
                imageUrl={
                  project.imageData
                    ? `data:image/jpeg;base64,${project.imageData}`
                    : undefined
                }
                progress={Math.min(
                  Math.floor((project.finance_collected / project.finance_objective) * 100),
                  100
                )}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
