import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTextField from "../CustomTextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";
import RoleToggle from "../RoleToggle/RoleToggle";
import Dropdown from "../DropdownMenu/Dropdown";
import styles from "./SignupForm.module.scss";

const SignupForm: React.FC = () => {
  const [role, setRole] = useState<"BENEFICIARY" | "CONTRIBUTOR">("BENEFICIARY");
  const [step , setStep] = useState(1) ;
  const [formData, setFormData] = useState<any>({
    role: "BENEFICIARY"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDropdownChange = (selectedOption: string) => {
    setFormData((prevData: any) => ({ ...prevData, type: selectedOption }));
  };

  useEffect(() => {
    setFormData((prevData: any) => ({ ...prevData, role }));
  }, [role]);

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8082/api/auth/register", formData);
      alert("Registration successful!");
      console.log("Response:", response.data);
    } catch (error) {
      alert("Registration failed!");
      console.error(error);
    }
  };
   
 

  const nextStep = () => setStep ((prev) => prev +1) ;
  const prevStep = () => setStep((prev) = prev-1) ;
  

  return (
    <div className={styles.formContainer}>
      <RoleToggle role={role} setRole={setRole} />

      {role === "BENEFICIARY" ? (
        <>
        {step === 1 && (<>
          <CustomTextField name="fullName" placeholder="Nom complet" onChange={handleChange} />
          <CustomTextField name="licence" placeholder="Matricule Fiscal" onChange={handleChange} />
          <CustomTextField name="email" placeholder="Email" type="email" onChange={handleChange} />
          <CustomTextField name="phone" placeholder="Téléphone" onChange={handleChange} />
        
        </>)}
          
        {step === 2 && (<> 
          <CustomTextField name="address" placeholder="Adresse" onChange={handleChange} />
          <CustomTextField name="companyName" placeholder="Nom de l'entreprise" onChange={handleChange} />
          <CustomTextField name="activity_field" placeholder="Domaine d'activité" onChange={handleChange} />
          <CustomTextField name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />
          <CustomTextField name="confirmPassword" type="password" placeholder="Confirmer mot de passe" onChange={handleChange} />
        </>)}
        <div className={styles.buttonContainer}>
        {step < 1 && <CustomButton text="← Précédent" variant="secondary" onClick={prevStep} />}
        {step < 2 ? (
          
          <CustomButton text="Suivant →" variant="primary" onClick={nextStep} />
        ) : (
          <CustomButton text="S'inscrire" variant="primary" onClick={handleSubmit} />
        )}
      </div>
        </>
      ) : (
        <>
          <CustomTextField name="username" placeholder="Nom d'utilisateur" onChange={handleChange} />
          <CustomTextField name="fullName" placeholder="Nom complet" onChange={handleChange} />
          <CustomTextField name="email" placeholder="Email" onChange={handleChange} />
          <CustomTextField name="address" placeholder="Adresse" onChange={handleChange} />
          <CustomTextField name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />
          <CustomTextField name="confirmPassword" type="password" placeholder="Confirmer mot de passe" onChange={handleChange} />
          <CustomButton text="S'inscrire" onClick={handleSubmit} variant="primary" />
        </>
      )}

 
    </div>
  );
};

export default SignupForm;
