import React from "react";
import "./LandingPage.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";



const LandingPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">ED3AMNI</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Explore</li>
          <li>Campaigns</li>
          <li>FAQ</li>
        </ul>
        <div className="nav-buttons">
          <Button variant="outlined" className="btn-light">
            Contributeur
          </Button> 
          <Button variant="outlined" className="btn-light" onClick={() => navigate("/LoginBenificiary")} >
          Entreprise
          </Button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>
              Résoudre des problèmes
              <br />
              partout dans le monde
            </h1>
            <p className="subtext">
              Fund and sign campaigns and missions in
              <br />
              all the 234 countries on the globe
            </p>
            <a href="#" className="login-link">
              Already have an account? Log in
            </a>
          </div>
        </div>

        <div className="donations">
          <div className="donation" style={{ top: "10%", left: "5%" }}>
            <span>$23.42</span>
          </div>
          <div className="donation" style={{ top: "18%", left: "10%" }}>
            <span>$53.88</span>
          </div>
          <div className="donation" style={{ top: "40%", left: "8%" }}>
            <span>$12.31</span>
          </div>
          <div className="donation" style={{ top: "25%", right: "10%" }}>
            <span>$43.80</span>
          </div>
          <div className="donation" style={{ top: "35%", right: "5%" }}>
            <span>$51.21</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;