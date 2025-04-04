import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClassBooking from "./pages/Instructor";
import StudentDashboard from "./pages/StudentDashboard";
import FlowBuilder from "./pages/FlowBuilder";
import SessionSummary from "./pages/SessionSummary";
import Poses from './pages/Poses';
import SignIn from './pages/SignIn';
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Poses />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/instructor" element={<ClassBooking />} />
        <Route path="/flow-builder" element={<FlowBuilder />} />
        <Route path="/session-summary" element={<SessionSummary />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
