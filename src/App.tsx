
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonalInfo from "./pages/PersonalInfo";
import ParentInfo from "./pages/ParentInfo";
import EducationalInfo from "./pages/EducationalInfo";
import Assessment from "./pages/Assessment";
import DocumentsUpload from "./pages/DocumentsUpload";
import IVC from "./pages/IVC";
import EligibilityVerification from "./pages/EligibilityVerification";
import CDA from "./pages/CDA";
import ApplicantSignature from "./pages/ApplicantSignature";
import RCV from "./pages/RCV";
import CongratulationsPage from "./pages/CongratulationsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/parent-info" element={<ParentInfo />} />
        <Route path="/educational-info" element={<EducationalInfo />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/documents-upload" element={<DocumentsUpload />} />
        <Route path="/referre-contact-verification" element={<RCV />} />
        <Route path="/institutional-verification" element={<IVC />} />
        <Route path="/eligibility-verification" element={<EligibilityVerification />} />
        <Route path="/cda" element={<CDA />} />
        <Route path="/applicant-signature" element={<ApplicantSignature />} />
        <Route path="/congratulation" element={<CongratulationsPage />} />






      </Routes>
    </Router>
  );
};

export default App;
