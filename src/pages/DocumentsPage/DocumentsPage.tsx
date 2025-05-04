import React from "react";
import DocumentCard from "../../components/DocumentCard/DocumentCard";

const DocumentsPage: React.FC = () => {
  return (
    <>
    <h1>📄 Mes Documents</h1> 
    <DocumentCard
      title="Patente"
      lastModified="12/04/2024"
      onEdit={() => console.log("Edit clicked")}
      onDownload={() => console.log("Download clicked")}
    />
    <DocumentCard
      title="Registre national des entreprises"
      lastModified="12/04/2024"
      onEdit={() => console.log("Edit clicked")}
      onDownload={() => console.log("Download clicked")}
    />
    <DocumentCard
      title="Carte CIN de proprietaire"
      lastModified="12/04/2024"
      onEdit={() => console.log("Edit clicked")}
      onDownload={() => console.log("Download clicked")}
    />

        </>
  );
};

export default DocumentsPage;
