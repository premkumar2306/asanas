import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import FlowBuilder from "./pages/FlowBuilder";
import SessionSummary from "./pages/Classes/SessionSummary";
import Poses from './pages/Poses';
import SignIn from './pages/SignIn';
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import UpCommingClasses from './pages/Classes/UpCommingClasses';
import StudioDetails from './pages/Studio/StudioDetails';
import InStudioLocations from './pages/Studio/InStudioLocations';
import PlansPricing from './pages/Studio/PlansPricing';
import RecentClasses from "./pages/Classes/RecentClasses";
import Team from "./pages/Studio/Team";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col overflow-y-auto">
        <Navbar />
        <div className="flex-grow">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
