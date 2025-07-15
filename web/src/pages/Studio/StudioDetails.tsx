import React, { useState } from "react";
import * as yup from "yup";
import { StudioInfo } from "../../types/studio";
import { getStudioInfoFromFirestore, saveStudioInfoToFirestore } from "../../api/studio";

export const  studioSchema = yup.object().shape({
  name: yup.string().required("Studio name is required."),
  tagline: yup.string(),
  description: yup.string(),
  email: yup.string().email("Email is invalid.").required("Email is required."),
  phone: yup.string().required("Phone number is required."),
  emergencyContact: yup.string().required("Emergency contact is required."),
  website: yup.string().url("Website URL is invalid.").nullable(),
  logoUrl: yup.string().url("Logo URL is invalid.").nullable(),
  socialMedia: yup.object().shape({
    instagramUrl: yup.string().url("Instagram URL is invalid.").nullable(),
    facebookUrl: yup.string().url("Facebook URL is invalid.").nullable(),
    youtubeUrl: yup.string().url("YouTube URL is invalid.").nullable(),
  }),
  groupClassSchedule: yup.string().nullable(),
  servicesEnabled: yup.array().of(yup.string()).default([]),
  serviceStartDate: yup.string().nullable(),
  operatingHours: yup.string().required("Operating hours are required."),
  timeZone: yup.string().required("Time zone is required."),
  registrationFee: yup.string().nullable(),
  freeTrialsAllowed: yup.number().nullable(),
  membershipOptions: yup.string().nullable(),
  gstRegistered: yup.boolean().default(false),
  gstin: yup.string().nullable(),
  receiptHeading: yup.string().nullable(),
  receiptFootnote: yup.string().nullable(),
  address1: yup.string().nullable(),
  address2: yup.string().nullable(),
  city: yup.string().nullable(),
  state: yup.string().nullable(),
  country: yup.string().required("Country is required."),
  pincode: yup.string().nullable(),
});

const StudioDetails: React.FC = () => {
  const [studioInfo, setStudioInfo] = useState<StudioInfo>({
    /** Basic Information */
    name: "Easy Studio USA",
    tagline: "Find Your Inner Balance",
    description: "A modern, easy-to-use yoga studio offering a variety of classes in a relaxed environment.",
    email: "contact@easystudiousa.com",
    phone: "+1 (555) 123-4567",
    emergencyContact: "+1 (555) 987-6543",
    
    /** Online Presence */
    website: "https://www.easystudiousa.com",
    logoUrl: "https://via.placeholder.com/150",
    socialMedia: {
      instagramUrl: "https://www.instagram.com/easystudiousa",
      facebookUrl: "https://www.facebook.com/easystudiousa",
      youtubeUrl: "https://www.youtube.com/easystudiousa",
    },
    
    /** Schedule & Services */
    groupClassSchedule: "https://www.easystudiousa.com/schedule",
    servicesEnabled: ["Group Classes", "Personal Classes", "Video Courses"],
    serviceStartDate: "Oct 04, 2026",
    operatingHours: "Mon-Fri: 6 AM - 9 PM, Sat-Sun: 8 AM - 5 PM",
    timeZone: "Pacific Time (PT)",
    
    /** Registration & Membership */
    registrationFee: "50", // USD
    freeTrialsAllowed: 1,
    membershipOptions: "Monthly, Annual, Drop-In",
    
    /** GST & Legal */
    gstRegistered: false,
    gstin: "",
    
    /** Receipt Details */
    receiptHeading: "Easy Studio USA",
    receiptFootnote: "Thank you for choosing Easy Studio USA!",
    
    /** Registered Address */
    address1: "123 Easy Lane",
    address2: "",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    pincode: "90012",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await studioSchema.validate(studioInfo, { abortEarly: false });
      setErrors({});
      console.log("Saving studio info:", studioInfo);
      // Add API call or further save logic here.
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

  const postalCodeLabel = studioInfo.country === "India" ? "Pincode" : "Zip Code";
  const currencySymbol = studioInfo.country === "India" ? "INR" : "USD";

  // Time zone options
  const timeZoneOptions = [
    "Pacific Time (PT)",
    "Eastern Time (ET)",
    "Central Time (CT)",
    "Mountain Time (MT)",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">Studio Details</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Information */}
          <section className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Studio Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Studio Name</label>
                <input
                  type="text"
                  value={studioInfo.name}
                  onChange={(e) => setStudioInfo({ ...studioInfo, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              {/* Tagline */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Tagline / Mission</label>
                <input
                  type="text"
                  value={studioInfo.tagline}
                  onChange={(e) => setStudioInfo({ ...studioInfo, tagline: e.target.value })}
                  placeholder="Find Your Inner Balance"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
              </div>
              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={studioInfo.email}
                  onChange={(e) => setStudioInfo({ ...studioInfo, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={studioInfo.phone}
                  onChange={(e) => setStudioInfo({ ...studioInfo, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
              </div>
              {/* Emergency Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <input
                  type="text"
                  value={studioInfo.emergencyContact}
                  onChange={(e) => setStudioInfo({ ...studioInfo, emergencyContact: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
              </div>
              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  value={studioInfo.description}
                  onChange={(e) => setStudioInfo({ ...studioInfo, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Online Presence */}
          <section className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold mb-4">Online Presence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  value={studioInfo.website}
                  onChange={(e) => setStudioInfo({ ...studioInfo, website: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              {/* Logo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                <input
                  type="url"
                  value={studioInfo.logoUrl}
                  onChange={(e) => setStudioInfo({ ...studioInfo, logoUrl: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              {/* Instagram URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
                <input
                  type="url"
                  value={studioInfo.socialMedia.instagramUrl}
                  onChange={(e) =>
                    setStudioInfo({
                      ...studioInfo,
                      socialMedia: { ...studioInfo.socialMedia, instagramUrl: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              {/* Facebook URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
                <input
                  type="url"
                  value={studioInfo.socialMedia.facebookUrl}
                  onChange={(e) =>
                    setStudioInfo({
                      ...studioInfo,
                      socialMedia: { ...studioInfo.socialMedia, facebookUrl: e.target.value },
                    })
                  }
                  placeholder="https://facebook.com/..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              {/* YouTube URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
                <input
                  type="url"
                  value={studioInfo.socialMedia.youtubeUrl}
                  onChange={(e) =>
                    setStudioInfo({
                      ...studioInfo,
                      socialMedia: { ...studioInfo.socialMedia, youtubeUrl: e.target.value },
                    })
                  }
                  placeholder="https://youtube.com/..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Schedule & Services */}
          <section className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold mb-4">Schedule & Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Group Class Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Group Class Schedule (Link)
                </label>
                <input
                  type="text"
                  value={studioInfo.groupClassSchedule}
                  onChange={(e) =>
                    setStudioInfo({ ...studioInfo, groupClassSchedule: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              {/* Service Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Start Date
                </label>
                <input
                  type="text"
                  value={studioInfo.serviceStartDate || ""}
                  onChange={(e) => setStudioInfo({ ...studioInfo, serviceStartDate: e.target.value })}
                  placeholder="Oct 04, 2026"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              {/* Operating Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={studioInfo.operatingHours}
                  onChange={(e) => setStudioInfo({ ...studioInfo, operatingHours: e.target.value })}
                  placeholder="Mon-Fri: 6 AM - 9 PM, Sat-Sun: 8 AM - 5 PM"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
                {errors.operatingHours && <p className="mt-1 text-xs text-red-500">{errors.operatingHours}</p>}
              </div>
              {/* Time Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time Zone
                </label>
                <select
                  value={studioInfo.timeZone}
                  onChange={(e) => setStudioInfo({ ...studioInfo, timeZone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                >
                  {["Pacific Time (PT)", "Eastern Time (ET)", "Central Time (CT)", "Mountain Time (MT)"].map(
                    (tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    )
                  )}
                </select>
                {errors.timeZone && <p className="mt-1 text-xs text-red-500">{errors.timeZone}</p>}
              </div>
            </div>
          </section>

          {/* Section 4: Registration & Membership */}
          <section className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold mb-4">Registration & Membership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Registration Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registration Fee ({currencySymbol})
                </label>
                <input
                  type="text"
                  value={studioInfo.registrationFee || ""}
                  onChange={(e) => setStudioInfo({ ...studioInfo, registrationFee: e.target.value })}
                  placeholder={studioInfo.country === "India" ? "INR 500" : "USD 50"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              {/* Free Trials Allowed */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Free Trials Allowed
                </label>
                <input
                  type="number"
                  value={studioInfo.freeTrialsAllowed || 0}
                  onChange={(e) => setStudioInfo({ ...studioInfo, freeTrialsAllowed: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              {/* Membership Options */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Membership Options
                </label>
                <input
                  type="text"
                  value={studioInfo.membershipOptions || ""}
                  onChange={(e) => setStudioInfo({ ...studioInfo, membershipOptions: e.target.value })}
                  placeholder="e.g. Monthly, Annual, Drop-In"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
            </div>
          </section>

          {/* Section 5: GST Details */}
          <section className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold mb-4">GST Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Registered for GST */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registered for GST?
                </label>
                <div className="mt-1 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={studioInfo.gstRegistered === true}
                      onChange={() => setStudioInfo({ ...studioInfo, gstRegistered: true })}
                      className="form-radio"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={studioInfo.gstRegistered === false}
                      onChange={() => setStudioInfo({ ...studioInfo, gstRegistered: false, gstin: "" })}
                      className="form-radio"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
              {/* GSTIN (only enabled if GST is registered) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">GSTIN</label>
                <input
                  type="text"
                  value={studioInfo.gstin || ""}
                  onChange={(e) => setStudioInfo({ ...studioInfo, gstin: e.target.value })}
                  disabled={!studioInfo.gstRegistered}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200 ${
                    !studioInfo.gstRegistered ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>
          </section>

          {/* Section 6: Receipt Details */}
          <section className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold mb-4">Receipt Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Receipt Heading */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Receipt Heading</label>
                <input
                  type="text"
                  value={studioInfo.receiptHeading || ""}
                  onChange={(e) => setStudioInfo({ ...studioInfo, receiptHeading: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              {/* Receipt Footnote */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Receipt Footnote</label>
                <input
                  type="text"
                  value={studioInfo.receiptFootnote || ""}
                  onChange={(e) => setStudioInfo({ ...studioInfo, receiptFootnote: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
            </div>
          </section>

          {/* Section 7: Registered Address */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Registered Address</h2>
            <div className="space-y-4">
              {/* Address Line 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                <input
                  type="text"
                  value={studioInfo.address1 || studioInfo.address}
                  onChange={(e) => setStudioInfo({ ...studioInfo, address1: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              {/* Address Line 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                <input
                  type="text"
                  value={studioInfo.address2 || ""}
                  onChange={(e) => setStudioInfo({ ...studioInfo, address2: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    value={studioInfo.city || "Los Angeles"}
                    onChange={(e) => setStudioInfo({ ...studioInfo, city: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    value={studioInfo.state || "CA"}
                    onChange={(e) => setStudioInfo({ ...studioInfo, state: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {studioInfo.country === "India" ? "Pincode" : "Zip Code"}
                </label>
                <input
                  type="text"
                  value={studioInfo.pincode || "90012"}
                  onChange={(e) => setStudioInfo({ ...studioInfo, pincode: e.target.value })}
                  placeholder={studioInfo.country === "India" ? "e.g. 560001" : "e.g. 90210"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>
            </div>
          </section>

          {/* Save Button */}
          <button
            type="submit"
            onClick={handleSubmit}
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