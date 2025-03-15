import React from "react";
import styles from"./CustomButton.module.scss"

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, variant = "primary" }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;
