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
        className={`${styles.toggleButton} ${role === "BENEFICIARY" ? styles.active : ""}`}
        onClick={() => setRole("BENEFICIARY")}
      >
        BENEFICIARY
      </button>
      <button
        className={`${styles.toggleButton} ${role === "CONTRIBUTOR" ? styles.active : ""}`}
        onClick={() => setRole("CONTRIBUTOR")}
      >
        CONTRIBUTOR
      </button>
    </div>
  );
};

export default RoleToggle;
