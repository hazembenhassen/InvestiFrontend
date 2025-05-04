import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import CustomTextField from "../CustomTextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";
import EmailIcon from "../../assets/icons/emailIcon.png";
import RoleToggle from "../RoleToggle/RoleToggle";

const LoginForm: React.FC = () => {
  const [role, setRole] = useState<"BENEFICIARY" | "CONTRIBUTOR">("BENEFICIARY");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    console.log("Final Form Data:", formData);

    try {
      const response = await axios.post("http://localhost:8082/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = response.data.token;
      const fullName = response.data.fullName;
      console.log("Login Success:", response.data);
      localStorage.setItem("authToken", token);
      localStorage.setItem("fullName", fullName);
      alert("Login successful!");
      navigate("/Home");
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || "Unknown error occurred!";
      alert(`Login failed! ${errorMessage}`);
    }
  };

  const handleSubmitContributor = async () => {
    console.log("Final Form Data:", formData);

    try {
      const response = await axios.post("http://localhost:8082/api/auth/login-contributor", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = response.data.token;
      const fullName = response.data.fullName;
      console.log("Login Success:", response.data);
      localStorage.setItem("authToken", token);
      localStorage.setItem("fullName", fullName);
      alert("Login successful!");
      navigate("/ContributorHomePage");
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || "Unknown error occurred!";
      alert(`Login failed! ${errorMessage}`);
    }
  };

  return (
    <div>
      <RoleToggle role={role} setRole={setRole} />

      <CustomTextField
        icon={<img src={EmailIcon} alt="Email Icon" />}
        name="email"
        placeholder="E-Mail"
        type="email"
        onChange={handleChange}
      />

      <CustomTextField
        icon={<img src={EmailIcon} alt="Lock Icon" />}
        name="password"
        placeholder="Mot de passe"
        type="password"
        onChange={handleChange}
      />


      <div>
        <CustomButton text="Se connecter" variant="primary" onClick={role === "BENEFICIARY" ? handleSubmit : handleSubmitContributor} />
      </div>

    </div>
  );
};

export default LoginForm;
