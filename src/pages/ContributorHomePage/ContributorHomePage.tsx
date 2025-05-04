import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ContributorHomePage.module.scss";
import CustomButton from "../../components/CustomButton/CustomButton";
import ContributorNavbar from "../../components/Navbar/ContributorNavbar";

interface Project {
  id: number;
  project_name: string;
  project_description: string;
  finance_objective: number;
  finance_collected: number;
  userId: number;
  imageData?: string;
}

const ContributorHomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const fullName = localStorage.getItem("fullName");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to load projects", error);
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleContribute = (projectId: number) => {
    navigate(`/contribute/${projectId}`);
  };

  return (
    <div className={styles.page}>
      <ContributorNavbar />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Bienvenue, {fullName}</h1>
          <CustomButton
            text="Se déconnecter"
            variant="secondary"
            onClick={handleLogout}
            className={styles.logoutButton}
          />
        </header>

        <section className={styles.projectsSection}>
          <h2 className={styles.sectionTitle}>🚀 Les Campagnes disponibles</h2>
          <div className={styles.projectList}>
            {projects.length > 0 ? (
              projects.map((project) => {
                const progress =
                  (project.finance_collected / project.finance_objective) * 100;

                return (
                  <div key={project.id} className={styles.projectCard}>
                    {project.imageData && (
                      <img
                        src={`data:image/jpeg;base64,${project.imageData}`}
                        alt={project.project_name}
                        className={styles.projectImage}
                      />
                    )}
                    <div className={styles.projectContent}>
                      <h3>{project.project_name}</h3>
                      <p>{project.project_description}</p>
                      <div className={styles.financeDetails}>
                        <p>
                          🎯 Objectif: <strong>{project.finance_objective} DT</strong>
                        </p>
                        <p>
                          💰 Collecté: <strong>{project.finance_collected} DT</strong>
                        </p>
                      </div>

                      <div className={styles.progressBarContainer}>
                        <div
                          className={styles.progressBar}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <p className={styles.progressText}>
                        {Math.min(progress, 100).toFixed(1)}% atteint
                      </p>

                      <div className={styles.buttonWrapper}>
                        <CustomButton
                          text="Contribuer"
                          variant="primary"
                          onClick={() => handleContribute(project.id)}
                          className={styles.contributeButton}
                        />
                      </div>

                    
                    
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Aucun projet disponible pour l'instant.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContributorHomePage;
