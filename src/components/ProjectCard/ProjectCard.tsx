import React from "react";
import "./ProjectCard.scss";
import { Heart, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  name: string;
  description: string;
  owner: string;
  amount: number;
  progress: number;
  imageUrl?: string;
  avatar?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
 
  name,
  description,
  owner,
  amount,
  progress,
  imageUrl,
  avatar,
}) => {
  return (
   
    <div className="project-card">
      <div className="project-card__image">
        <img src={imageUrl} alt="Project" />
        <div className="project-card__actions">
          <Heart size={20} />
          <Bookmark size={20} />
        </div>
      </div>
      <div className="project-card__content">
        <div className="project-card__owner">
          <img src={avatar } alt={owner} className="avatar" />
          <span>{owner}</span>
        </div>
        <h3 className="project-card__title">{name}</h3>
        <p className="project-card__description">{description}</p>
        <div className="project-card__footer">
          <div className="project-card__amount">
            <span>€{amount?.toLocaleString()}</span>
          </div>
          <div className="project-card__progress">
            <div
              className="project-card__progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
            <span>{progress}%</span>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ProjectCard;
