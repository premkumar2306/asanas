import React from "react";
import { Link } from "react-router-dom";
import { RecentClassesTable } from "./RecentClassesTable";
import { useRecentClasses } from "./useRecentClasses";

export const RecentClasses: React.FC = () => {
  const { recentClasses } = useRecentClasses();

  return (
    <div className="p-4 bg-white rounded shadow max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Recent group classes</h2>
        <Link to="/all-group-classes" className="text-blue-600 hover:underline">
          See All
        </Link>
      </div>
      <RecentClassesTable classes={recentClasses} />
    </div>
  );
};

export default RecentClasses;
