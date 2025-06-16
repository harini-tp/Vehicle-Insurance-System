import React from "react";
import { MemoryRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { AuthProvider } from "./context/AuthContext";
import ClientHome from "./components/clientComponents/ClientHome";
import OfficerHome from "./components/officerComponents/OfficerHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Officer Components
import CreateBasePremium from "./components/officerComponents/Plans/CreateBasePremium";
import CreateAddOn from "./components/officerComponents/Plans/CreateAddOn";
import ViewProposals from "./components/officerComponents/PolicyProposals/ViewProposals";
import EditProposalStatus from "./components/officerComponents/PolicyProposals/EditProposalStatus";
import ViewPayments from "./components/officerComponents/Payments/ViewPayments";
import ViewPolicies from "./components/officerComponents/Policies/ViewPolicies";
import ViewClaimRequests from "./components/officerComponents/Claims/ViewClaimRequests";
import EditClaimRequestStatus from "./components/officerComponents/Claims/EditClaimRequestStatus";
import ViewClaimPayments from "./components/officerComponents/Claims/ViewClaimPayments";
import EditClaimPaymentStatus from "./components/officerComponents/Claims/EditClaimPaymentStatus";
import ViewDocuments from "./components/officerComponents/Documents/ViewDocuments";
import GetDocument from "./components/officerComponents/Documents/GetDocument";


// SidebarSections Components
// View Plans
import BasePremiumPlans from "./components/clientComponents/SidebarSections/ViewPlans/BasePremiumPlans";
import ViewAddOns from "./components/clientComponents/SidebarSections/ViewPlans/ViewAddOns";

// Vehicle Management
import MyVehicles from "./components/clientComponents/SidebarSections/VehicleManagement/MyVehicles";
import RegisterVehicle from "./components/clientComponents/SidebarSections/VehicleManagement/RegisterVehicles";
import EditVehicle from "./components/clientComponents/SidebarSections/VehicleManagement/EditVehicles";

// Policy Management
import ProposePolicy from "./components/clientComponents/SidebarSections/PolicyManagement/ProposePolicy";
import ProposalStatus from "./components/clientComponents/SidebarSections/PolicyManagement/ProposalStatus";
import ViewQuotes from "./components/clientComponents/SidebarSections/PolicyManagement/ViewQuotes";
import DownloadSummary from "./components/clientComponents/SidebarSections/PolicyManagement/DownloadSummary";

// My Policies
import MyPolicies from "./components/clientComponents/SidebarSections/MyPolicies/MyPolicies";
import MakePayment from "./components/clientComponents/SidebarSections/MyPolicies/MakePayment";
import MyPayments from "./components/clientComponents/SidebarSections/MyPolicies/MyPayments";

// Claims
import RequestClaim from "./components/clientComponents/SidebarSections/Claims/RequestClaim";
import ClaimStatus from "./components/clientComponents/SidebarSections/Claims/ClaimStatus";
import ClaimPaymentStatus from "./components/clientComponents/SidebarSections/Claims/ClaimPaymentStatus";

// Profile
import EditUser from "./components/clientComponents/SidebarSections/Profile/EditUser";
import UploadDocument from "./components/clientComponents/SidebarSections/Profile/UploadDocument";


function App() {
  return (
    <AuthProvider>
      <MemoryRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/client-home" element={<ClientHome />} />
            <Route path="/officer-home" element={<OfficerHome />} />

            {/* Officer Routes */}
            <Route path="/create-basepremium" element={<CreateBasePremium />} />
            <Route path="/create-addon" element={<CreateAddOn />} />
            <Route path="/view-proposals" element={<ViewProposals />} />
            <Route path="/edit-proposal-status" element={<EditProposalStatus />} />
            <Route path="/view-payments" element={<ViewPayments />} />
            <Route path="/view-policies" element={<ViewPolicies />} />
            <Route path="/view-claim-requests" element={<ViewClaimRequests />} />
            <Route path="/edit-claim-request-status" element={<EditClaimRequestStatus />} />
            <Route path="/view-claim-payments" element={<ViewClaimPayments />} />
            <Route path="/edit-claim-payment-status" element={<EditClaimPaymentStatus />} />
            <Route path="/view-documents" element={<ViewDocuments />} />
            <Route path="/get-document" element={<GetDocument />} />

            {/* View Plans */}
            <Route path="/base-premium-plans" element={<BasePremiumPlans />} />
            <Route path="/addons" element={<ViewAddOns />} />

            {/* Vehicle Management */}
            <Route path="/my-vehicles" element={<MyVehicles />} />
            <Route path="/register-vehicle" element={<RegisterVehicle />} />
            <Route path="/edit-vehicle" element={<EditVehicle />} />

            {/* Policy Management */}
            <Route path="/propose-policy" element={<ProposePolicy />} />
            <Route path="/proposal-status" element={<ProposalStatus />} />
            <Route path="/view-quotes" element={<ViewQuotes />} />
            <Route path="/download-summary" element={<DownloadSummary />} />

            {/* My Policies */}
            <Route path="/my-policies" element={<MyPolicies />} />
            <Route path="/make-payment" element={<MakePayment />} />
            <Route path="/my-payments" element={<MyPayments />} />

            {/* Claims */}
            <Route path="/request-claim" element={<RequestClaim />} />
            <Route path="/claim-status" element={<ClaimStatus />} />
            <Route path="/claim-payment-status" element={<ClaimPaymentStatus />} />

            {/* Profile */}
            <Route path="/edit-user" element={<EditUser />} />
            <Route path="/upload-document" element={<UploadDocument />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </MemoryRouter>
    </AuthProvider>
  );
}

export default App;
