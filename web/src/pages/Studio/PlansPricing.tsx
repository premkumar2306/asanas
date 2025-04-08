import React, { useState } from "react";
import PlanModal from "../../components/PlansPricing/PlanModal";
import { PlanData, initialPlans } from "../../components/PlansPricing/types";
import {TableContainer} from "../../components/Common/Table/TableContainer";
import { Table } from "../../components/Common/Table/Table";

const PlansPricing: React.FC = () => {
  const [plans, setPlans] = useState<PlanData[]>(initialPlans);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
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
    const planToEdit = plans.find((p) => p.id === planId);
    if (planToEdit) {
      setModalData(planToEdit);
      setShowModal(true);
    }
  };

  const handleSave = () => {
    if (modalMode === "create") {
      setPlans([...plans, { ...modalData, id: Date.now() }]);
    } else {
      setPlans((prev) =>
        prev.map((p) => (p.id === modalData.id ? { ...modalData } : p))
      );
    }
    setShowModal(false);
  };

  const handleDeactivate = (planId: number) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, active: !p.active } : p))
    );
  };

  const handleDelete = (planId: number) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans((prev) => prev.filter((p) => p.id !== planId));
    }
  };

  // Define columns for the table
  const columns = [
    {
      header: "Service",
      accessor: (plan: PlanData) => plan.service,
      className: "w-1/6",
    },
    {
      header: "Name",
      accessor: (plan: PlanData) => plan.name,
      className: "w-1/6",
    },
    {
      header: "Description",
      accessor: (plan: PlanData) => plan.description,
      className: "w-1/3",
    },
    {
      header: "Price",
      accessor: (plan: PlanData) => plan.price,
      className: "w-1/6",
    },
    {
      header: "Status",
      accessor: (plan: PlanData) => (plan.active ? "Active" : "Inactive"),
      className: "w-1/6",
    },
    {
      header: "Actions",
      accessor: (plan: PlanData) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openEditModal(plan.id)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeactivate(plan.id)}
            className="text-yellow-600 hover:underline"
          >
            {plan.active ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={() => handleDelete(plan.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
      className: "w-1/6",
    },
  ];

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

        <TableContainer>
          <Table
            columns={columns}
            data={plans}
            emptyMessage="No plans found."
            isLoading={false}
          />
        </TableContainer>

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

export default PlansPricing;
