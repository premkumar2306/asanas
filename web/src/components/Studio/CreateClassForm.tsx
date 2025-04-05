import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ClassSession } from '../../types';

const CreateClassForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'beginner',
    time: '',
    duration: 60,
    gmeetLink: '',
    price: 0,
    maxStudents: 10,
    recurring: false,
    recurringDays: [] as string[],
    endDate: '' // new field
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const classData = {
        ...formData,
        instructorId: 'current-instructor-id', // Replace with actual auth ID
        enrolledStudents: 0,
        createdAt: new Date()
      };
      
      await addDoc(collection(db, 'classes'), classData);
      alert('Class created successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error creating class:', error);
      alert('Failed to create class');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.level}
            onChange={(e) => setFormData({...formData, level: e.target.value as any})}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            required
            min="15"
            step="15"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Google Meet Link</label>
        <input
          type="url"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.gmeetLink}
          onChange={(e) => setFormData({...formData, gmeetLink: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Maximum Students</label>
        <input
          type="number"
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.maxStudents}
          onChange={(e) => setFormData({...formData, maxStudents: parseInt(e.target.value)})}
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            checked={formData.recurring}
            onChange={(e) => setFormData({...formData, recurring: e.target.checked})}
          />
          <span className="ml-2 text-sm text-gray-700">Recurring Class</span>
        </label>
      </div>

      {formData.recurring && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Recurring Days</label>
          <div className="mt-2 space-y-2">
            {daysOfWeek.map((day) => (
              <label key={day} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  checked={formData.recurringDays.includes(day)}
                  onChange={(e) => {
                    const updatedDays = e.target.checked
                      ? [...formData.recurringDays, day]
                      : formData.recurringDays.filter(d => d !== day);
                    setFormData({...formData, recurringDays: updatedDays});
                  }}
                />
                <span className="ml-2 text-sm text-gray-700">{day}</span>
              </label>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Ends on (optional)</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter the date on or before which you want the recurring classes to end. Leave empty to continue forever.
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Class
      </button>
    </form>
  );
};

export default CreateClassForm;