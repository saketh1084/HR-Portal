import { Routes, Route } from "react-router-dom";
import CandidateLayout from "../../components/candidate/CandidateLayout";
import JobSearch from "../../components/candidate/JobSearch";
import JobListings from "../../components/candidate/JobListings";
import JobDetail from "../../components/candidate/JobDetail";
import ApplicationTracking from "../../components/candidate/ApplicationTracking";
import Notifications from "../../components/candidate/Notifications";
import Chatbot from "../../components/candidate/Chatbot";
import ResumeUpload from "../../components/candidate/ResumeUpload";

const CandidateDashboard = () => {
  return (
    <CandidateLayout>
      <Routes>
        <Route path="/" element={<JobListings />} />
        <Route path="/search" element={<JobSearch />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/applications" element={<ApplicationTracking />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/upload-resume" element={<ResumeUpload />} />
      </Routes>
    </CandidateLayout>
  );
};

export default CandidateDashboard;

