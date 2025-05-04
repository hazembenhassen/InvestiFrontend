import React from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import styles from "./Auth.module.scss"
import registerBanner from "../../assets/images/RegisterBanner.png"
import logo from "../../assets/images/logo.png"

const AuthLayout: React.FC = () => {
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
                <SignupForm />
            </div>
        </div>
    );
};

export default AuthLayout;
