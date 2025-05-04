import React from "react";
import styles from "./ErrorPage.module.scss";
import { Frown } from "lucide-react"; // you can use any icon library

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Frown size={80} strokeWidth={1.5} />
      </div>
      <h1 className={styles.title}>Oops! Page Not Found</h1>
      <p className={styles.message}>
        The page you’re looking for doesn’t exist or you don’t have access to it.
      </p>
      <a className={styles.button} href="/">
        Go back to Login
      </a>
    </div>
  );
};

export default ErrorPage;
