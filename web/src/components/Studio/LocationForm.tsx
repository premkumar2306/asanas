import React from "react";
import { Location, StudioAddress } from "../../types/studio";
import { TeamMember } from "../../pages/Studio/Team";

interface LocationFormProps {
  newLocation: any; // Accept Location or partial for editing
  setNewLocation: (loc: any) => void;
  onAdd: () => void;
  onCancel: () => void;
  show: boolean;
  teamMembers: TeamMember[];
}

const LocationForm: React.FC<LocationFormProps> = ({
  newLocation,
  setNewLocation,
  onAdd,
  onCancel,
  show,
  teamMembers,
}) => {
  if (!show) return null;

  // Fix addressObj updates to always set country to a string
  const safeAddressObj = {
    address1: newLocation.addressObj?.address1 || "",
    address2: newLocation.addressObj?.address2 || "",
    city: newLocation.addressObj?.city || "",
    state: newLocation.addressObj?.state || "",
    country: newLocation.addressObj?.country || "",
    pincode: newLocation.addressObj?.pincode || "",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Location</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={newLocation.name}
              onChange={(e) =>
                setNewLocation({ ...newLocation, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {/* Address fields as object */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Line 1
            </label>
            <input
              type="text"
              value={safeAddressObj.address1}
              onChange={(e) =>
                setNewLocation({
                  ...newLocation,
                  addressObj: { ...safeAddressObj, address1: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Line 2
            </label>
            <input
              type="text"
              value={safeAddressObj.address2}
              onChange={(e) =>
                setNewLocation({
                  ...newLocation,
                  addressObj: { ...safeAddressObj, address2: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={safeAddressObj.city}
              onChange={(e) =>
                setNewLocation({
                  ...newLocation,
                  addressObj: { ...safeAddressObj, city: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              value={safeAddressObj.state}
              onChange={(e) =>
                setNewLocation({
                  ...newLocation,
                  addressObj: { ...safeAddressObj, state: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={safeAddressObj.country}
              onChange={(e) =>
                setNewLocation({
                  ...newLocation,
                  addressObj: { ...safeAddressObj, country: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              value={safeAddressObj.pincode}
              onChange={(e) =>
                setNewLocation({
                  ...newLocation,
                  addressObj: { ...safeAddressObj, pincode: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              value={newLocation.capacity}
              onChange={(e) =>
                setNewLocation({
                  ...newLocation,
                  capacity: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Members
            </label>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((member) => (
                <label key={member.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={newLocation.team?.includes(member.id) || false}
                    onChange={(e) => {
                      const team = newLocation.team || [];
                      setNewLocation({
                        ...newLocation,
                        team: e.target.checked
                          ? [...team, member.id]
                          : team.filter((id) => id !== member.id),
                      });
                    }}
                  />
                  <span className="text-sm">{member.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onAdd}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
