// src/components/AddProject/AddProjectForm.tsx

import React, { useState } from "react";
import axios from "axios";
import styles from "./AddProjectForm.module.scss";

interface AddProjectFormProps {
  projectType: string;
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ projectType }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [financeObjective, setFinanceObjective] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      setMessage("Token not found. Please log in.");
      return;
    }
  
    const payload = {
      project_name: projectName,
      project_description: projectDescription,
      project_location: city,
      finance_objective: financeObjective,
      finance_collected: 0.0,
      project_startDate: startDate,
      project_endDate: endDate,
      project_status: "Pending",
      project_type: projectType,
      country: country,
      state: city,
    };
  
    const formData = new FormData();
    formData.append("project", new Blob([JSON.stringify(payload)], { type: "application/json" }));
    if (projectImage) {
      formData.append("image", projectImage);
    }
  
    try {
      await axios.post("http://localhost:8082/api/projects/create", formData, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      setMessage("Projet ajouté avec succès !");
      setProjectName("");
      setProjectDescription("");
      setFinanceObjective(0);
      setStartDate("");
      setEndDate("");
      setCountry("");
      setCity("");
      setProjectImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("Échec de l'ajout du projet.");
    }
  };
    

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.column}>
          <h4>Informations générales</h4>
          <input
            type="text"
            placeholder="titre ..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <textarea
            placeholder="description ..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
          <div className={styles.imageUploadBox}>
            <label htmlFor="imageUpload" className={styles.uploadLabel}>
              <div className={styles.uploadIcon}>⬆️</div>
              <p><strong>Image ( Couverture )</strong></p>
              <p>SVG, PNG, JPG ou GIF (max. 1MB)</p>
              {previewUrl && <img src={previewUrl} alt="preview" className={styles.preview} />}
              {fileError && <p className={styles.error}>{fileError}</p>}
            </label>
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg, .gif, .svg"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 1024 * 1024) {
                    setFileError("Fichier trop volumineux (max 1MB)");
                    setProjectImage(null);
                    setPreviewUrl(null);
                  } else {
                    setFileError(null);
                    setProjectImage(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }
              }}
            />
          </div>


        </div>

        <div className={styles.column}>
          <h4>Objectif financier</h4>
          <input
            type="number"
            placeholder="montant à atteindre"
            value={financeObjective}
            onChange={(e) => setFinanceObjective(Number(e.target.value))}
            required
          />

          <h4>Période de la campagne</h4>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <h4>Localisation</h4>
          <input
            type="text"
            placeholder="pays"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Soumettre le projet
          </button>
        </div>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default AddProjectForm;
