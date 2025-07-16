import React, { useState, useEffect } from "react";
import PlanModal from "../../components/PlansPricing/PlanModal";
import { PlanData, initialPlans } from "../../components/PlansPricing/types";
import { TableContainer } from "../../components/Common/Table/TableContainer";
import { Table } from "../../components/Common/Table/Table";
import {
  getPlansFromFirestore,
  savePlanToFirestore,
  deletePlanFromFirestore,
  updatePlanInFirestore,
  getStudioInfoFromFirestore,
} from "../../api/studio";
import { Location } from "../../types/studio";

const PlansPricing: React.FC = () => {
  const [plans, setPlans] = useState<PlanData[]>([]);
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
    termMonths: 1,
    locationId: "",
  });
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  useEffect(() => {
    async function fetchPlans() {
      const dbPlans = await getPlansFromFirestore();
      setPlans(dbPlans);
    }
    fetchPlans();
  }, []);

  useEffect(() => {
    async function fetchLocations() {
      const studioInfo = await getStudioInfoFromFirestore("default");
      setLocations(
        Array.isArray(studioInfo?.locations) ? studioInfo.locations : [],
      );
    }
    fetchLocations();
  }, []);

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

  const handleSave = async () => {
    if (modalMode === "create") {
      const newPlan = { ...modalData, id: Date.now() };
      await savePlanToFirestore(newPlan);
      setPlans([...plans, newPlan]);
    } else {
      await updatePlanInFirestore(modalData);
      setPlans((prev) =>
        prev.map((p) => (p.id === modalData.id ? { ...modalData } : p)),
      );
    }
    setShowModal(false);
  };

  const handleDeactivate = async (planId: number) => {
    const updatedPlans = plans.map((p) =>
      p.id === planId ? { ...p, active: !p.active } : p,
    );
    setPlans(updatedPlans);
    const plan = updatedPlans.find((p) => p.id === planId);
    if (plan) await updatePlanInFirestore(plan);
  };

  const handleDelete = async (planId: number) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      await deletePlanFromFirestore(planId);
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Location
          </label>
          <select
            value={selectedLocationId}
            onChange={(e) => setSelectedLocationId(e.target.value)}
            className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <TableContainer>
          <Table
            columns={columns}
            data={
              selectedLocationId
                ? plans.filter((p) => p.locationId === selectedLocationId)
                : plans
            }
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
            locations={locations.map((loc) => ({ id: loc.id, name: loc.name }))}
          />
        )}
      </div>
    </div>
  );
};

export default PlansPricing;
