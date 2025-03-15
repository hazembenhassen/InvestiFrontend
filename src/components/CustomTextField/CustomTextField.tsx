import React from "react";
import styles from "./CustomTextField.module.scss";


interface CustomTextFieldProps {
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  name: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({placeholder,  type = "text", value, onChange , variant = "primary" , icon ,name }) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.icon}>{icon}</div> 
      <input  className={` ${styles.input} ${styles[variant]}`} placeholder={placeholder} type={type} value={value} onChange={onChange} name={name}/>
    </div>
  );
};

export default CustomTextField;
