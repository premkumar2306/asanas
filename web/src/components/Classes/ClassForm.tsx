import React, { useState } from 'react';
import { ClassFormData, DAYS_OF_WEEK, INITIAL_CLASS_DATA } from './types';

interface ClassFormProps {
  initialData?: ClassFormData;
  onSubmit: (data: ClassFormData) => void;
  mode: 'create' | 'edit';
}

const ClassForm: React.FC<ClassFormProps> = ({
  initialData = INITIAL_CLASS_DATA,
  onSubmit,
  mode
}) => {
  const [formData, setFormData] = useState<ClassFormData>(initialData);

  const handleChange = (field: keyof ClassFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      <div className="space-y-4 max-h-[80vh] overflow-y-auto px-2">
        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Service Type *</label>
          <select
            value={formData.service}
            onChange={(e) => handleChange('service', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="group">Group Classes</option>
            <option value="personal">Personal Classes</option>
            <option value="workshop">Workshops</option>
          </select>
        </div>

        {/* Zoom User */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Zoom User</label>
          <input
            type="text"
            value={formData.zoomUser || ''}
            onChange={(e) => handleChange('zoomUser', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter Zoom host email"
          />
        </div>

        {/* Start Date/Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Starts At *</label>
          <input
            type="datetime-local"
            value={formData.startsAt}
            onChange={(e) => handleChange('startsAt', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes) *</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => handleChange('duration', parseInt(e.target.value))}
            min="15"
            step="15"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Recurring Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recurring Days</label>
          <div className="grid grid-cols-4 gap-2">
            {DAYS_OF_WEEK.map(day => (
              <label key={day} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={formData.recurringDays.includes(day)}
                  onChange={(e) => {
                    const newDays = e.target.checked
                      ? [...formData.recurringDays, day]
                      : formData.recurringDays.filter(d => d !== day);
                    handleChange('recurringDays', newDays);
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Teacher */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Teacher *</label>
          <input
            type="text"
            value={formData.teacher}
            onChange={(e) => handleChange('teacher', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Class Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Class Type *</label>
          <select
            value={formData.classType}
            onChange={(e) => handleChange('classType', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="online">Online</option>
            <option value="in-studio">In-Studio</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Max Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Capacity</label>
          <input
            type="number"
            value={formData.maxCapacity || ''}
            onChange={(e) => handleChange('maxCapacity', e.target.value ? parseInt(e.target.value) : undefined)}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Payment Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Model *</label>
          <div className="space-x-4">
            {['standard', 'donation', 'free'].map(model => (
              <label key={model} className="inline-flex items-center">
                <input
                  type="radio"
                  value={model}
                  checked={formData.paymentModel === model}
                  onChange={(e) => handleChange('paymentModel', e.target.value)}
                  className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{model}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Trial Drop-In */}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={formData.trialDropIn}
              onChange={(e) => handleChange('trialDropIn', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Enable Trial Drop-In</span>
          </label>
        </div>

        {/* Eligible Plans */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Eligible Plans</label>
          <input
            type="text"
            value={formData.eligiblePlans.join(', ')}
            onChange={(e) => handleChange('eligiblePlans', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter plan names separated by commas"
          />
        </div>

        {/* Discount Codes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount Codes</label>
          <input
            type="text"
            value={formData.discountCodes.join(', ')}
            onChange={(e) => handleChange('discountCodes', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter discount codes separated by commas"
          />
        </div>

        {/* Recording Options */}
        <div className="space-y-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={formData.shareRecording}
              onChange={(e) => handleChange('shareRecording', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Share Cloud Recording</span>
          </label>
          <br />
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={formData.autoRecord}
              onChange={(e) => handleChange('autoRecord', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Auto-Record Sessions</span>
          </label>
        </div>

        {/* Enforce Form Fill */}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={formData.enforceFormFill}
              onChange={(e) => handleChange('enforceFormFill', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Require Health Questionnaire</span>
          </label>
        </div>

        {/* Subscription Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Subscription Start Date</label>
          <input
            type="date"
            value={formData.subscriptionStartDate || ''}
            onChange={(e) => handleChange('subscriptionStartDate', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {mode === 'create' ? 'Create Class' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ClassForm;
