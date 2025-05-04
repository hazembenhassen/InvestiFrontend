import React from "react";
import "./MyProjectDetails.scss";

interface ProjectResponse {
  id: number;
  project_name: string;
  project_description: string;
  finance_objective: number;
  finance_collected: number;
  userId: number;
  imageData?: string;
}

interface ProjectDetailsProps {
  project: ProjectResponse;
  onBack: () => void;
}

const MyProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack }) => {
  return (
    <div className="project-details">
      <button onClick={onBack} className="back-button">🔙 Retour</button>
      <h1>{project.project_name}</h1>
      {project.imageData && (
        <img
          src={`data:image/jpeg;base64,${project.imageData}`}
          alt={project.project_name}
        />
      )}
      <p>{project.project_description}</p>
      <div className="finance">
        🤑 {project.finance_collected} / {project.finance_objective}
      </div>
    </div>
  );
};

export default MyProjectDetails;
