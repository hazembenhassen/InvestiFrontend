import React from "react";
import "./TypeCard.scss";

interface TypeCardProps {
  imageSrc: string;
  iconSrc: React.ElementType;
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

const TypeCard: React.FC<TypeCardProps> = ({
  imageSrc,
  iconSrc: Icon,
  title,
  description,
  selected = false,
  onClick,
}) => {
  return (
    <div
      className={`type-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <img src={imageSrc} alt="Type visual" className="type-image" />
      <div className="type-content">
        <Icon className="type-icon" />
        <h3 className="type-title">{title}</h3>
        <p className="type-description">{description}</p>
      </div>
    </div>
  );
};

export default TypeCard;
