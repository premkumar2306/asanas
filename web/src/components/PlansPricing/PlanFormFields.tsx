import React from "react";
import { PlanData } from "./types";

interface PlanFormFieldsProps {
  data: PlanData;
  onChange: (data: PlanData) => void;
}

const PlanFormFields: React.FC<PlanFormFieldsProps> = ({ data, onChange }) => {
  const updateData = (updates: Partial<PlanData>) => {
    onChange({ ...data, ...updates });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Service */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Service
        </label>
        <select
          value={data.service}
          onChange={(e) => updateData({ service: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option>Group Classes</option>
          <option>Personal Classes</option>
          <option>Video Courses</option>
          <option>Workshops</option>
        </select>
      </div>

      {/* Plan Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Plan Name
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Add other form fields here... */}
      {/* This component should contain all the form fields from the original modal */}
    </div>
  );
};

export default PlanFormFields;
