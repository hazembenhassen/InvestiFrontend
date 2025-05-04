import React, { useState } from "react";
import styles from "../Auth/Auth.module.scss"
import registerBanner from "../../assets/images/RegisterBanner.png"
import logo from "../../assets/images/logo.png"
import LoginForm from "../../components/LoginForm/LoginForm";
import RoleToggle from "../../components/RoleToggle/RoleToggle";

const LoginPage: React.FC = () => {
    
    return (
        <div className={styles.container}>
           
            <div className={styles.leftSection}>
     
                <h2>
                    Plateforme de <span>Financement</span> <span className={styles.bold}>Participatif</span>
                </h2>
                <img src={registerBanner} alt="signup" className={styles.image} />
            </div>


            <div className={styles.rightSection}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <h1 className="JoinHeader">Se Connecter</h1>
                
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;