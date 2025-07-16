import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/StudentDashboard";
import FlowBuilder from "../pages/FlowBuilder";
import SessionSummary from "../pages/Classes/SessionSummary";
import Poses from "../pages/Poses";
import SignIn from "../pages/SignIn";
import UpCommingClasses from "../pages/Classes/UpCommingClasses";
import StudioDetails from "../pages/Studio/StudioDetails";
import InStudioLocations from "../pages/Studio/InStudioLocations";
import PlansPricing from "../pages/Studio/PlansPricing";
import RecentClasses from "../pages/Classes/RecentClasses";
import Team from "../pages/Studio/Team";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Poses />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/flow-builder" element={<FlowBuilder />} />
      <Route path="/upcoming-classes" element={<UpCommingClasses />} />
      <Route path="/session-summary" element={<SessionSummary />} />
      <Route path="/studio-details" element={<StudioDetails />} />
      <Route path="/in-studio-locations" element={<InStudioLocations />} />
      <Route path="/team" element={<Team />} />
      <Route path="/class-recent" element={<RecentClasses />} />
      <Route path="/plans-pricing" element={<PlansPricing />} />
    </Routes>
  );
}
