import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InstructorSignup from "./pages/InstructorSignup";
import StudentDashboard from "./pages/StudentDashboard";
import FlowBuilder from "./pages/FlowBuilder";
import SessionSummary from "./pages/SessionSummary";
import Poses from  './pages/Poses';
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Poses />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/instructor/signup" element={<InstructorSignup />} />
        <Route path="/flow-builder" element={<FlowBuilder />} />
        <Route path="/session-summary" element={<SessionSummary />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;