import React from "react";
import "./DocumentCard.scss";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

type DocumentCardProps = {
  title: string;
  lastModified: string;
  onEdit?: () => void;
  onDownload?: () => void;
};

const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  lastModified,
  onEdit,
  onDownload,
}) => {
  return (
    <div className="document-card">
      <div className="left">
        <div className="file-icon" />
        <div className="text">
          <h4>{title}</h4>
          <span className="edit" onClick={onEdit}>
            Modifier
          </span>
        </div>
      </div>
      <div className="right">
        <span className="date">Dernier modification : {lastModified}</span>
        <IconButton onClick={onDownload} className="download-btn">
          <DownloadIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default DocumentCard;
