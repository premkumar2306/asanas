import React, { useEffect, useState, useRef } from "react";
import {
  getStudioInfoFromFirestore,
  saveStudioInfoToFirestore,
} from "../../api/studio";
import { StudioInfo, Location } from "../../types/studio";
import { useAuth } from "../../hooks/useAuth";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  gender: "male" | "female";
  imageUrl?: string;
}

const Team: React.FC = () => {
  const auth = useAuth();
  const isAdmin =
    (auth as any)?.user?.role === "admin" ||
    (auth as any)?.currentUser?.role === "admin";

  const [studioInfo, setStudioInfo] = useState<StudioInfo | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchStudio() {
      const data = await getStudioInfoFromFirestore("default");
      setStudioInfo(data || null);
      setLocations(Array.isArray(data?.locations) ? data.locations : []);
      // Always load team from Firestore if available
      if (Array.isArray(data?.team) && data.team.length > 0) {
        setTeamMembers(data.team);
      }
    }
    fetchStudio();
  }, []);

  useEffect(() => {
    if (showModal && editingMember) {
      // Preselect locations assigned to this member
      const assigned = locations
        .filter((loc) => loc.team?.includes(editingMember.id))
        .map((loc) => loc.id);
      setSelectedLocations(assigned);
    }
  }, [showModal, editingMember, locations]);

  // Optionally, add a function to save team to Firestore
  async function saveTeamToDB(updatedTeam: TeamMember[]) {
    if (!studioInfo) return;
    await saveStudioInfoToFirestore(
      { ...studioInfo, team: updatedTeam },
      "default",
    );
    setTeamMembers(updatedTeam);
  }

  // Helper: get locations for a team member
  function getLocationsForMember(memberId: string) {
    return locations.filter((loc) => loc.team?.includes(memberId));
  }

  function handleEdit(member: TeamMember) {
    setEditingMember(member);
    setShowModal(true);
  }

  function handleAdd() {
    setEditingMember({
      id: Date.now().toString(),
      name: "",
      email: "",
      role: "",
      bio: "",
      gender: "male",
      imageUrl: "",
    });
    setShowModal(true);
  }

  function handleLocationToggle(locId: string) {
    setSelectedLocations((prev) =>
      prev.includes(locId)
        ? prev.filter((id) => id !== locId)
        : [...prev, locId],
    );
  }

  // Placeholder: Call backend to send invite email
  async function sendTeamInviteEmail(
    email: string,
    name: string,
    locationIds: string[],
  ) {
    // TODO: Replace with actual backend call
    // Example: await fetch('/api/send-invite', { method: 'POST', body: JSON.stringify({ email, name, locationIds }) });
    return Promise.resolve(true);
  }

  async function handleSave() {
    setModalError(null);
    const name = nameRef.current?.value?.trim() || "";
    const email = emailRef.current?.value?.trim() || "";
    const role = roleRef.current?.value?.trim() || "";
    const bio = bioRef.current?.value?.trim() || "";
    const gender = genderRef.current?.value as "male" | "female";
    const imageUrl = imageUrlRef.current?.value?.trim() || "";
    // Validation
    if (!name) {
      setModalError("Name is required.");
      return;
    }
    if (!email) {
      setModalError("Email is required.");
      return;
    }
    if (!role) {
      setModalError("Role is required.");
      return;
    }
    if (!gender) {
      setModalError("Gender is required.");
      return;
    }
    setModalLoading(true);
    const updated: TeamMember = {
      id: editingMember?.id || Date.now().toString(),
      name,
      email,
      role,
      bio,
      gender,
      imageUrl,
    };
    let updatedTeam;
    if (teamMembers.some((m) => m.id === updated.id)) {
      updatedTeam = teamMembers.map((m) => (m.id === updated.id ? updated : m));
    } else {
      updatedTeam = [...teamMembers, updated];
    }
    // Update locations' team assignments
    const updatedLocations = locations.map((loc) => {
      let teamArr = Array.isArray(loc.team)
        ? loc.team.filter((id) => id !== updated.id)
        : [];
      if (selectedLocations.includes(loc.id)) {
        teamArr = [...teamArr, updated.id];
      }
      return { ...loc, team: teamArr };
    });
    try {
      const studioPayload = {
        ...(studioInfo as StudioInfo),
        locations: updatedLocations,
        team: updatedTeam,
      };
      await saveStudioInfoToFirestore(studioPayload, "default");
      setTeamMembers(updatedTeam);
      setLocations(updatedLocations);
      // Send invite email if new member
      if (!teamMembers.some((m) => m.id === updated.id)) {
        try {
          await sendTeamInviteEmail(email, name, selectedLocations);
        } catch (inviteErr) {
          setModalError("Team member saved, but failed to send invite email.");
        }
      }
      setShowModal(false);
      setEditingMember(null);
    } catch (err) {
      setModalError("Failed to save team member. Please try again.");
    } finally {
      setModalLoading(false);
    }
  }

  function handleDelete(id: string) {
    const updatedTeam = teamMembers.filter((m) => m.id !== id);
    saveTeamToDB(updatedTeam);
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Studio Team</h1>
        <p className="text-center text-gray-600 mb-8">
          Meet the passionate instructors who are part of our studio and lead
          classes for students.
        </p>
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={!isAdmin}
            title={!isAdmin ? "Only admins can add team members" : ""}
          >
            Add Team Member
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full h-56 bg-gray-200">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center">
                  {member.name}
                </h2>
                <p className="text-center text-gray-500">{member.role}</p>
                <p className="mt-4 text-gray-700 text-center text-sm">
                  {member.bio}
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
                {locations.length > 0 && (
                  <div className="mt-4 text-center">
                    <span className="font-semibold text-xs text-gray-600">
                      Locations:
                    </span>
                    <div className="flex flex-wrap gap-2 justify-center mt-1">
                      {getLocationsForMember(member.id).map((loc, idx) => (
                        <span
                          key={loc.id + "-" + member.id + "-" + idx}
                          className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs"
                        >
                          {loc.name}
                        </span>
                      ))}
                      {getLocationsForMember(member.id).length === 0 && (
                        <span className="text-gray-400 text-xs">
                          Not assigned
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {showModal && !isAdmin ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
              <h2 className="text-xl font-bold mb-4">Access Denied</h2>
              <p className="mb-4">Only admins can add or edit team members.</p>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                  {editingMember &&
                  teamMembers.some((m) => m.id === editingMember.id)
                    ? "Edit"
                    : "Add"}{" "}
                  Team Member
                </h2>
                <div className="space-y-4">
                  {modalError && (
                    <div className="text-red-600 text-sm mb-2">
                      {modalError}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      ref={nameRef}
                      defaultValue={editingMember?.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      ref={emailRef}
                      defaultValue={editingMember?.email}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <input
                      ref={roleRef}
                      defaultValue={editingMember?.role}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      ref={bioRef}
                      defaultValue={editingMember?.bio}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      ref={genderRef}
                      defaultValue={editingMember?.gender}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      ref={imageUrlRef}
                      defaultValue={editingMember?.imageUrl}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  {locations.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assign Locations
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {locations.map((loc) => (
                          <label
                            key={loc.id}
                            className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={selectedLocations.includes(loc.id)}
                              onChange={() => handleLocationToggle(loc.id)}
                              disabled={modalLoading}
                            />
                            {loc.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setEditingMember(null);
                        setModalError(null);
                      }}
                      className="px-4 py-2 border rounded-md hover:bg-gray-50"
                      disabled={modalLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      disabled={modalLoading}
                    >
                      {modalLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Team;
