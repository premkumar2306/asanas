import React from "react";
import { PlanData } from "./types";

interface PlanModalProps {
  mode: "create" | "edit";
  data: PlanData;
  onClose: () => void;
  onSave: () => void;
  onChange: (data: PlanData) => void;
  locations: { id: string; name: string }[]; // <-- Add this prop
}

const PlanModal: React.FC<PlanModalProps> = ({
  mode,
  data,
  onClose,
  onSave,
  onChange,
  locations,
}) => {
  const updateField = (field: keyof PlanData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {mode === "create" ? "Create New Plan" : "Edit Plan"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Type
              </label>
              <select
                value={data.service}
                onChange={(e) => updateField("service", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Group Classes">Group Classes</option>
                <option value="Personal Classes">Personal Classes</option>
                <option value="Video Courses">Video Courses</option>
                <option value="Workshops">Workshops</option>
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
                onChange={(e) => updateField("name", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={data.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Special Instructions */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Special Instructions
              </label>
              <textarea
                value={data.specialInstructions}
                onChange={(e) => updateField("specialInstructions", e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Access Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Access Type
              </label>
              <select
                value={data.accessType}
                onChange={(e) => updateField("accessType", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="online">Online</option>
                <option value="in-studio">In Studio</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Payment Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Model
              </label>
              <select
                value={data.paymentModel}
                onChange={(e) => updateField("paymentModel", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="standard">Standard</option>
                <option value="donation">Donation</option>
                <option value="free">Free</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                value={data.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="e.g., INR 2000 or USD 40"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Country Pricing */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country-Specific Pricing
              </label>
              <div className="space-y-2">
                {data.countryPricing?.map((cp, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={cp.country}
                      onChange={(e) => {
                        const newPricing = [...(data.countryPricing || [])];
                        newPricing[index] = { ...cp, country: e.target.value };
                        updateField("countryPricing", newPricing);
                      }}
                      placeholder="Country (e.g., US, IN)"
                      className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      value={cp.price}
                      onChange={(e) => {
                        const newPricing = [...(data.countryPricing || [])];
                        newPricing[index] = { ...cp, price: e.target.value };
                        updateField("countryPricing", newPricing);
                      }}
                      placeholder="Price (e.g., USD 40)"
                      className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => {
                        const newPricing = [...(data.countryPricing || [])];
                        newPricing.splice(index, 1);
                        updateField("countryPricing", newPricing);
                      }}
                      className="px-3 py-1 text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newPricing = [...(data.countryPricing || []), { country: "", price: "" }];
                    updateField("countryPricing", newPricing);
                  }}
                  className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Add Country Price
                </button>
              </div>
            </div>

            {/* Geo Pricing */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Geo Pricing
              </label>
              <select
                value={data.geoPricing}
                onChange={(e) => updateField("geoPricing", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="single">Single Price</option>
                <option value="multi-currency">Multi Currency</option>
                <option value="south-asia-only">South Asia Only</option>
                <option value="other-regions-only">Other Regions Only</option>
              </select>
            </div>

            {/* Term and Classes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Term and Classes
              </label>
              <input
                type="text"
                value={data.termAndClasses}
                onChange={(e) => updateField("termAndClasses", e.target.value)}
                placeholder="e.g., 12 classes • Standard"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Subscription Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subscription Start Date
              </label>
              <input
                type="date"
                value={data.subscriptionStartDate}
                onChange={(e) => updateField("subscriptionStartDate", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Restrict Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Restrict Type
              </label>
              <select
                value={data.restrictType}
                onChange={(e) => updateField("restrictType", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All</option>
                <option value="segments">Segments</option>
                <option value="emails">Emails</option>
              </select>
            </div>

            {/* Restrict Emails */}
            {data.restrictType === "emails" && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Restricted Emails
                </label>
                <input
                  type="text"
                  value={data.restrictEmails}
                  onChange={(e) => updateField("restrictEmails", e.target.value)}
                  placeholder="Enter comma-separated email addresses"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* Locations */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Locations
              </label>
              <div className="space-y-2">
                {locations.map((location) => (
                  <div key={location.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.locations?.some((loc) => loc.id === location.id)}
                      onChange={(e) => {
                        const newLocations = e.target.checked
                          ? [...(data.locations || []), { id: location.id, name: location.name }]
                          : data.locations?.filter((loc) => loc.id !== location.id) || [];
                        updateField("locations", newLocations);
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {location.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select
                value={data.locationId || ""}
                onChange={(e) => updateField("locationId", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={data.renewalReminders}
                  onChange={(e) => updateField("renewalReminders", e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Send Renewal Reminders
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={data.isPublic}
                  onChange={(e) => updateField("isPublic", e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Make Plan Public
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={data.active}
                  onChange={(e) => updateField("active", e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Plan Active
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={data.trialDropIn}
                  onChange={(e) => updateField("trialDropIn", e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Offer Trial Drop-in
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {mode === "create" ? "Create Plan" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
