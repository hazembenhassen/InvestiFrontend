import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTextField from "../CustomTextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";
import RoleToggle from "../RoleToggle/RoleToggle";
import styles from "./SignupForm.module.scss";
import StartupIcon from "../../assets/icons/startupIcon.png";
import LicenceIcon from "../../assets/icons/licenceIcon.png";
import Dropdown from "../DropdownMenu/Dropdown";
import EmailIcon from "../../assets/icons/emailIcon.png";
import PhoneIcon from "../../assets/icons/phoneIcon.png";

const SignupForm: React.FC = () => {
  const [role, setRole] = useState("BENEFICIARY");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    licence: "",
    email: "",
    phone: "",
    type: "",
    address: "",
    companyName: "",
    activity_field: "",
    password: "",
    confirmPassword: "", 
    role: "BENEFICIARY"
  });

  const options = ["Option 1", "Option 2", "Option 3"];

 
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, role }));
  }, [role]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input name:", e.target.name); 
    setFormData((prevData) => {
      const updatedData = { ...prevData, [e.target.name]: e.target.value };
      console.log("Updated formData:", updatedData);
      return updatedData;
    });
  };

  const handleDropdownChange = (selectedOption: string) => {
    setFormData((prevData) => ({ ...prevData, type: selectedOption }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    console.log("Final Form Data:", formData);

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8082/api/auth/register", formData);
      console.log("Success:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className={styles.formContainer}>
      <RoleToggle role={role} setRole={setRole} />

      {step === 1 && (
        <>
          <CustomTextField icon={<img src={StartupIcon} alt="Startup Icon" />} name="companyName" placeholder="Nom de l'entreprise" type="text" onChange={handleChange} />
          <CustomTextField icon={<img src={LicenceIcon} alt="Licence Icon" />} name="licence" placeholder="Matricule Fiscal" type="text" onChange={handleChange} />
          <CustomTextField icon={<img src={EmailIcon} alt="Email Icon" />} name="email" placeholder="E-Mail" type="email" onChange={handleChange} />
          <Dropdown options={options} placeholder="Type" onSelect={handleDropdownChange} />
        </>
      )}

      {step === 2 && (
        <>
          <CustomTextField name="fullName" placeholder="Nom complet" type="text" onChange={handleChange} />
          <CustomTextField name="address" placeholder="Adresse" type="text" onChange={handleChange} />
          <CustomTextField icon={<img src={PhoneIcon} alt="Phone Icon" />} name="phone" placeholder="Numéro Tel" type="tel" onChange={handleChange} />
          <CustomTextField name="activity_field" placeholder="Domaine d'activité" type="text" onChange={handleChange} />
        </>
      )}

      {step === 3 && (
        <>
          <CustomTextField name="password" placeholder="Mot de passe" type="password" onChange={handleChange} />
          <CustomTextField name="confirmPassword" placeholder="Confirmer Mot de passe" type="password" onChange={handleChange} />
        </>
      )}

      <div className={styles.buttonContainer}>
        {step > 1 && <CustomButton text="← Précédent" variant="secondary" onClick={prevStep} />}
        {step < 3 ? (
          <CustomButton text="Suivant →" variant="primary" onClick={nextStep} />
        ) : (
          <CustomButton text="S'inscrire" variant="primary" onClick={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default SignupForm;
