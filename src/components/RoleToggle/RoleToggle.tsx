import React from "react";
import styles from "./RoleToggle.module.scss";

interface RoleToggleProps {
  role: string;
  setRole: (role: string) => void;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ role, setRole }) => {
  return (
    <div className={styles.roleToggle}>
      <button
        className={`${styles.toggleButton} ${role === "Entreprise" ? styles.active : ""}`}
        onClick={() => setRole("Entreprise")}
      >
        Entreprise
      </button>
      <button
        className={`${styles.toggleButton} ${role === "Association" ? styles.active : ""}`}
        onClick={() => setRole("Association")}
      >
        Association
      </button>
    </div>
  );
};

export default RoleToggle;
