import React, { useState, useEffect } from "react";
import {
  getStudioInfoFromFirestore,
  saveStudioInfoToFirestore,
} from "../../api/studio";
import { StudioInfo, Location } from "../../types/studio";
import { TeamMember } from "./Team";
import LocationForm from "../../components/Studio/LocationForm";

const InStudioLocations: React.FC = () => {
  const [studioInfo, setStudioInfo] = useState<StudioInfo | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLocation, setNewLocation] = useState<Omit<Location, "id">>({
    name: "",
    address: "",
    capacity: 0,
    amenities: [],
    isActive: true,
  });
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    async function fetchStudio() {
      const data = await getStudioInfoFromFirestore("default");
      setStudioInfo(data || null);
      setLocations(Array.isArray(data?.locations) ? data.locations : []);
      setTeamMembers(Array.isArray(data?.team) ? data.team : []);
    }
    fetchStudio();
  }, []);

  const handleAddLocation = async () => {
    if (!studioInfo) return; // Only save if studioInfo is loaded
    const location: Location = {
      id: Date.now().toString(),
      ...newLocation,
    };
    const updatedLocations = [...locations, location];
    setLocations(updatedLocations);
    setShowAddForm(false);
    setNewLocation({
      name: "",
      address: "",
      capacity: 0,
      amenities: [],
      isActive: true,
    });
    await saveStudioInfoToFirestore({
      ...studioInfo,
      locations: updatedLocations,
    });
    setStudioInfo({ ...studioInfo, locations: updatedLocations });
  };

  const handleDeleteLocation = async (id: string) => {
    if (!studioInfo) return; // Only save if studioInfo is loaded
    const updatedLocations = locations.filter((loc) => loc.id !== id);
    setLocations(updatedLocations);
    await saveStudioInfoToFirestore({
      ...studioInfo,
      locations: updatedLocations,
    });
    setStudioInfo({ ...studioInfo, locations: updatedLocations });
  };

  function handleEditLocation(location: Location) {
    setEditingLocation(location);
    setShowEditForm(true);
  }

  async function handleSaveLocationEdit() {
    if (!studioInfo || !editingLocation) return;
    const updatedLocations = locations.map((loc) =>
      loc.id === editingLocation.id ? editingLocation : loc,
    );
    setLocations(updatedLocations);
    await saveStudioInfoToFirestore({
      ...studioInfo,
      locations: updatedLocations,
    });
    setStudioInfo({ ...studioInfo, locations: updatedLocations });
    setShowEditForm(false);
    setEditingLocation(null);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!studioInfo ? (
        <div className="flex justify-center items-center h-32">
          <span>Loading studio info...</span>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Studio Locations</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              disabled={!studioInfo}
            >
              Add Location
            </button>
          </div>

          <div className="space-y-4">
            {locations.map((location) => (
              <div
                key={location.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{location.name}</h3>
                    <p className="text-gray-600">{location.address}</p>
                    <p className="text-sm text-gray-500">
                      Capacity: {location.capacity} people
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {location.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    {location.team && location.team.length > 0 && (
                      <div className="mt-2">
                        <span className="font-semibold text-sm">Team:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {location.team.map((teamId) => {
                            const member = teamMembers.find(
                              (m) => m.id === teamId,
                            );
                            return member ? (
                              <span
                                key={teamId}
                                className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs"
                              >
                                {member.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEditLocation(location)}
                      disabled={!studioInfo}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteLocation(location.id)}
                      disabled={!studioInfo}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <LocationForm
              newLocation={newLocation}
              setNewLocation={setNewLocation}
              onAdd={handleAddLocation}
              onCancel={() => setShowAddForm(false)}
              show={showAddForm}
              teamMembers={teamMembers}
            />

            {showEditForm && editingLocation && (
              <LocationForm
                newLocation={editingLocation}
                setNewLocation={(loc) =>
                  setEditingLocation({ ...editingLocation, ...loc })
                }
                onAdd={handleSaveLocationEdit}
                onCancel={() => {
                  setShowEditForm(false);
                  setEditingLocation(null);
                }}
                show={showEditForm}
                teamMembers={teamMembers}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InStudioLocations;
