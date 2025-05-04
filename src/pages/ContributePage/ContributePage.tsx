import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import styles from "./ContributePage.module.scss";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import ContributorNavbar from "../../components/Navbar/ContributorNavbar";

const ContributePage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [newComment, setNewComment] = useState("");
  const [project, setProject] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"DONS" | "PRET" | "ACTIONS">("DONS");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number>();
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(`http://localhost:8082/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(response.data);
      } catch (error) {
        console.error("Erreur de chargement du projet :", error);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);


  const fetchComments = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `http://localhost:8082/api/projects/${projectId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Erreur de chargement des commentaires :", error);
    }
  };

  useEffect(() => {
    if (projectId) fetchComments();
  }, [projectId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return alert("Veuillez écrire un message.");

    const token = localStorage.getItem("authToken");
    try {
      await axios.post(
        `http://localhost:8082/api/projects/${projectId}/comments`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Message de soutien envoyé !");
      setNewComment("");
    }
    catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
      alert("Erreur lors de l'envoi.");
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get("http://localhost:8082/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(res.data.userId);
      } catch (error) {
        console.error("Erreur de chargement du profil :", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0 || !stripe || !elements || !userId) {
      alert("Vérifiez vos informations de contribution.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      const paymentRes = await axios.post(
        "http://localhost:8082/api/stripe/create-payment-intent",
        { amount: parsedAmount * 100 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const clientSecret = paymentRes.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: "Contributor",
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        alert("Paiement échoué : " + result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await axios.post(
          "http://localhost:8082/api/contribution/create",
          {
            amount: parsedAmount,
            message: "Support via Stripe",
            type,
            contributorId: userId,
            projectId: Number(projectId),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Contribution réussie !");
        navigate("/ContributorHomePage");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors du traitement du paiement.");
    } finally {
      setLoading(false);
    }
  };

  if (!project) return <div>Chargement...</div>;

  return (
    <div>
      <ContributorNavbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src={project.imageData}
            alt="Project"
            onError={(e) => {
              e.currentTarget.src = "/default-image.png";
            }}
          />


          <h1>{project.project_name}</h1>
          <p>{project.short_description}</p>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.left}>
            <h2>About this project</h2>
            <p>{project.project_description}</p>

            <div className={styles.fundingDetails}>
              <p><strong>Goal:</strong> {project.finance_objective} DT</p>
              <p><strong>Raised:</strong> {project.finance_collected} DT</p>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${(project.finance_collected / project.finance_objective) * 100}%` }}
                />
              </div>
            </div>

            <h3>Messages de soutien 💬</h3>
            <div className={styles.supportMessages}>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className={styles.message}>
                    <p><strong>🙍‍♂️{comment.authorFullName}</strong> : {comment.content}</p>
                  </div>
                ))
              ) : (
                <p>Aucun message pour le moment.</p>
              )}
            </div>


            <h4>Laissez un message de soutien 💌</h4>
            <textarea
              className={styles.supportInput}
              placeholder="Écrivez un message de soutien..."
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <CustomButton text="Envoyer" variant="secondary" onClick={handleCommentSubmit} />

            <div className={styles.supportMessages}>
              {project.supportMessages?.map((msg: any, index: number) => (
                <div key={index} className={styles.message}>
                  <p><strong>{msg.contributorName}</strong> : {msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.contributionCard}>
              <h3>Fund this campaign</h3>

              <label>Type of Contribution</label>
              <select value={type} onChange={(e) => setType(e.target.value as any)}>
                <option value="DONS">Dons</option>
                <option value="PRET">Prêt</option>
                <option value="ACTIONS">Actions</option>
              </select>

              <CustomTextField
                name="amount"
                type="number"
                placeholder="Amount (DT)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <label>Credit Card</label>
              <div className={styles.cardElement}>
                <CardElement />
              </div>

              <CustomButton
                text={loading ? "Processing..." : "Donate now"}
                variant="primary"
                onClick={handleSubmit}
              />


            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ContributePage;
