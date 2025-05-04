import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyContributionsPage.module.scss";

interface ContributionResponse {
  id: number;
  amount: number;
  message: string;
  type: "DONS" | "PRET" | "ACTIONS";
  status: "PENDING" | "COMPLETED" | "FAILED";
  projectId: number;
  contributorEmail: string;
  createdAt: string;
}

const MyContributionsPage: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8082/api/contributions/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContributions(response.data);
      } catch (err) {
        setError("Erreur de chargement des contributions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Mes Contributions</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : contributions.length === 0 ? (
        <p>Aucune contribution trouvée.</p>
      ) : (
        <div className={styles.contributionList}>
          {contributions.map((contribution) => (
            <div key={contribution.id} className={styles.contributionCard}>
              <h3>Contribution #{contribution.id}</h3>
              <p><strong>Montant:</strong> {contribution.amount} DT</p>
              <p><strong>Message:</strong> {contribution.message}</p>
              <p><strong>Type:</strong> {contribution.type}</p>
              <p><strong>Status:</strong> {contribution.status}</p>
              <p><strong>Projet ID:</strong> {contribution.projectId}</p>
              <p><strong>Date:</strong> {new Date(contribution.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyContributionsPage;
