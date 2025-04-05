import React from "react";
import { PlanData } from "./types";

interface PlanTableProps {
  plans: PlanData[];
  onEdit: (id: number) => void;
  onDeactivate: (id: number) => void;
  onDelete: (id: number) => void;
}

const PlanTable: React.FC<PlanTableProps> = ({
  plans,
  onEdit,
  onDeactivate,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-3 px-4 font-semibold">Plan Name</th>
            <th className="py-3 px-4 font-semibold">Service</th>
            <th className="py-3 px-4 font-semibold">Price</th>
            <th className="py-3 px-4 font-semibold">Geo Pricing</th>
            <th className="py-3 px-4 font-semibold">Public?</th>
            <th className="py-3 px-4 font-semibold">Active?</th>
            <th className="py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id} className="border-b last:border-0">
              <td className="py-3 px-4">{plan.name}</td>
              <td className="py-3 px-4">{plan.service}</td>
              <td className="py-3 px-4">{plan.price}</td>
              <td className="py-3 px-4">{plan.geoPricing}</td>
              <td className="py-3 px-4">
                {plan.isPublic ? (
                  <span className="text-green-600 font-semibold">YES</span>
                ) : (
                  <span className="text-red-600 font-semibold">NO</span>
                )}
              </td>
              <td className="py-3 px-4">
                {plan.active ? (
                  <span className="text-green-600 font-semibold">YES</span>
                ) : (
                  <span className="text-red-600 font-semibold">NO</span>
                )}
              </td>
              <td className="py-3 px-4 space-x-2">
                <button
                  onClick={() => onEdit(plan.id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeactivate(plan.id)}
                  className="text-yellow-600 hover:underline"
                >
                  {plan.active ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => onDelete(plan.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanTable;