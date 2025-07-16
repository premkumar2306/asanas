import React, { useState } from "react";
import PlanTable from "./PlanTable";
import PlanModal from "./PlanModal";
import { PlanData, initialPlans } from "./types";

const PlanManager: React.FC = () => {
  const [plans, setPlans] = useState<PlanData[]>(initialPlans);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [modalData, setModalData] = useState<PlanData>({
    id: Date.now(),
    service: "Group Classes",
    name: "",
    description: "",
    specialInstructions: "",
    accessType: "online",
    paymentModel: "standard",
    renewalReminders: false,
    subscriptionStartDate: "",
    restrictType: "all",
    restrictEmails: "",
    geoPricing: "single",
    price: "",
    isPublic: false,
    active: true,
    countryPricing: [],
  });

  const openCreateModal = () => {
    setModalMode("create");
    setEditingId(null);
    setModalData({
      ...modalData,
      id: Date.now(),
      name: "",
      description: "",
    });
    setShowModal(true);
  };

  const openEditModal = (planId: number) => {
    setModalMode("edit");
    setEditingId(planId);
    const planToEdit = plans.find((p) => p.id === planId);
    if (planToEdit) {
      setModalData(planToEdit);
      setShowModal(true);
    }
  };

  const handleSave = () => {
    if (modalMode === "create") {
      setPlans([...plans, { ...modalData, id: Date.now() }]);
    } else if (modalMode === "edit" && editingId !== null) {
      setPlans((prev) =>
        prev.map((p) => (p.id === editingId ? { ...modalData } : p)),
      );
    }
    setShowModal(false);
  };

  const handleDeactivate = (planId: number) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, active: !p.active } : p)),
    );
  };

  const handleDelete = (planId: number) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans((prev) => prev.filter((p) => p.id !== planId));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Plans</h1>
          <button
            onClick={openCreateModal}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create New Plan
          </button>
        </div>

        <PlanTable
          plans={plans}
          onEdit={openEditModal}
          onDeactivate={handleDeactivate}
          onDelete={handleDelete}
        />

        {showModal && (
          <PlanModal
            mode={modalMode}
            data={modalData}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            onChange={setModalData}
          />
        )}
      </div>
    </div>
  );
};

export default PlanManager;
