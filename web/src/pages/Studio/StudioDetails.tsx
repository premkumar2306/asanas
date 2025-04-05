import React, { useState } from 'react';
import * as yup from 'yup';

interface StudioInfo {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

// Define the validation schema using Yup
const studioSchema = yup.object().shape({
  name: yup.string().required("Studio name is required."),
  description: yup.string(),
  email: yup.string().email("Email is invalid.").required("Email is required."),
  phone: yup.string().required("Phone number is required."),
  address: yup.string(),
  website: yup.string().url("Website URL is invalid.").nullable(),
  socialMedia: yup.object().shape({
    instagram: yup.string(),
    facebook: yup.string(),
    youtube: yup.string(),
  }),
});

const StudioDetails: React.FC = () => {
  const [studioInfo, setStudioInfo] = useState<StudioInfo>({
    name: 'Yogasara Studio',
    description: 'A peaceful sanctuary for yoga practice',
    email: 'contact@yogasara.com',
    phone: '+1 (555) 123-4567',
    address: '123 Yoga Street, Zen City, 12345',
    website: 'https://www.yogasara.com',
    socialMedia: {
      instagram: '@yogasara',
      facebook: 'YogasaraStudio',
      youtube: 'YogasaraChannel'
    }
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate the studioInfo object using the Yup schema
      await studioSchema.validate(studioInfo, { abortEarly: false });
      setErrors({});
      // Implement save functionality here (e.g., call API)
      console.log('Saving studio info:', studioInfo);
      // Optionally display a success message or redirect
    } catch (validationError: any) {
      const newErrors: { [key: string]: string } = {};
      if (validationError.inner) {
        validationError.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Studio Details</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Studio Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Studio Name</label>
              <input
                type="text"
                value={studioInfo.name}
                onChange={(e) =>
                  setStudioInfo({ ...studioInfo, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={studioInfo.description}
                onChange={(e) =>
                  setStudioInfo({ ...studioInfo, description: e.target.value })
                }
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={studioInfo.email}
                  onChange={(e) =>
                    setStudioInfo({ ...studioInfo, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={studioInfo.phone}
                  onChange={(e) =>
                    setStudioInfo({ ...studioInfo, phone: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={studioInfo.address}
                onChange={(e) =>
                  setStudioInfo({ ...studioInfo, address: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                value={studioInfo.website}
                onChange={(e) =>
                  setStudioInfo({ ...studioInfo, website: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.website && <p className="mt-1 text-xs text-red-500">{errors.website}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudioDetails;