// src/pages/NewCompainPage.tsx

import React, { useState } from 'react';
import TypeCard from '../../components/TypeCard/TypeCard';
import donationImage from '../../assets/images/Donation.png';
import Loan from '../../assets/images/Loan.png';
import Partnership from '../../assets/images/Partner.png';
import { FaDonate } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbTransactionDollar } from "react-icons/tb";
import './NewCampainPage.scss';
import AddProjectForm from '../../components/AddProject/AddProjectForm';
import CustomButton from '../../components/CustomButton/CustomButton';

const NewCompainPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (selectedType) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setSelectedType(null);
  };

  return (
    <div className="new-campaign-page">
      <h1>Lancer une nouvelle campagne</h1>

      {step === 1 && (
        <>
          <h3 className="type-title">Choisir le type de votre campagne</h3>
          <div className="TypeCards">
            <TypeCard
              imageSrc={donationImage}
              iconSrc={FaDonate}
              title="Demande de Dons"
              description="Lancez une campagne de dons..."
              selected={selectedType === "Demande de Dons"}
              onClick={() => setSelectedType("Demande de Dons")}
            />
            <TypeCard
              imageSrc={Loan}
              iconSrc={GiTakeMyMoney}
              title="Demander un Prêt"
              description="Obtenez un financement sous forme de prêt..."
              selected={selectedType === "Demander un Prêt"}
              onClick={() => setSelectedType("Demander un Prêt")}
            />
            <TypeCard
              imageSrc={Partnership}
              iconSrc={TbTransactionDollar}
              title="Rechercher des Actionnaire"
              description="Attirez des investisseurs prêts à s’associer..."
              selected={selectedType === "Rechercher des Actionnaire"}
              onClick={() => setSelectedType("Rechercher des Actionnaire")}
            />
          </div>
          <div className="StepsButtons">
            <CustomButton text="← Précedent" variant="primary" onClick={handleBack} />
            <CustomButton text="Suivant →" variant="primary" onClick={handleNext} />
          </div>
        </>
      )}

      {step === 2 && selectedType && (
        <>
          <h3 className="type-title">Formulaire - {selectedType}</h3>
          <AddProjectForm projectType={selectedType} />
          <div className="StepsButtons">
            <CustomButton text="← Précedent" variant="primary" onClick={handleBack} />
            <CustomButton text="Soumettre" variant="primary" onClick={() => {}} />
          </div>
        </>
      )}
    </div>
  );
};

export default NewCompainPage;
