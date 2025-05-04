import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import NotFound from "../pages/NotFound/NotFound";
import AuthLayout from "../pages/Auth/Auth";
import LoginPage from "../pages/LoginPage.tsx/LoginPage";
import Library from "../pages/Library/Library";
import BeneficiaryDashboard from "../components/BeneficiaryDashboard/BeneficiaryDashboard";
import AddProjectForm from "../components/AddProject/AddProjectForm";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import LandingPage from "../pages/LandingPage/LandingPage";
import AdminDashboard from "../pages/AdminPage/AdminDashboard";
import UserManagement from "../components/AdminComponents/UserManagement/UserManagement";
import ContributorHomePage from "../pages/ContributorHomePage/ContributorHomePage";
import ContributePage from "../pages/ContributePage/ContributePage";
import AdminProjectManagement from "../components/AdminComponents/AdminProjectManagement/AdminProjectManagement";
import MyContributionsPage from "../pages/MyContributionsPage/MyContributionsPage";

// 🔑 Replace this with your actual Stripe public key
const stripePromise = loadStripe("pk_test_51QYUADEjFlrYiQppwFctfASzKxvdrbffIsRCTQazg1UtKF1u2GgHgel4KYpcgyHdvHR6eA7FpKeNysFePhGsIOXL00L85G5QlT");

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/LoginBenificiary" element={<LoginPage />} />
          <Route path="/Register" element={<AuthLayout />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/projects" element={<AdminProjectManagement />} />

          <Route
            path="/addProject"
            element={
              <ProtectedRoute>
                <AddProjectForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mescontributions"
            element={
              <ProtectedRoute>
                <MyContributionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/BenificiaryDashboard"
            element={
              <ProtectedRoute>
                <BeneficiaryDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contribute/:projectId"
            element={<ContributePage />}
          />
          <Route
            path="/ContributorHomePage"
            element={
              <ProtectedRoute>
                <ContributorHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Elements>
    </Router>
  );
};

export default AppRouter;
