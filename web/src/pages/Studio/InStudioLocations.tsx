import React, { useState } from 'react';

interface Location {
  id: string;
  name: string;
  address: string;
  capacity: number;
  amenities: string[];
  isActive: boolean;
}

const InStudioLocations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Main Studio',
      address: '123 Yoga Street, Zen City, 12345',
      capacity: 30,
      amenities: ['Mats', 'Showers', 'Lockers', 'Parking'],
      isActive: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newLocation, setNewLocation] = useState<Omit<Location, 'id'>>({
    name: '',
    address: '',
    capacity: 0,
    amenities: [],
    isActive: true
  });

  const handleAddLocation = () => {
    const location: Location = {
      id: Date.now().toString(),
      ...newLocation
    };
    setLocations([...locations, location]);
    setShowAddForm(false);
    setNewLocation({
      name: '',
      address: '',
      capacity: 0,
      amenities: [],
      isActive: true
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Studio Locations</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
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
                <p className="text-sm text-gray-500">Capacity: {location.capacity} people</p>
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
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Location</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  value={newLocation.capacity}
                  onChange={(e) => setNewLocation({...newLocation, capacity: parseInt(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLocation}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InStudioLocations;