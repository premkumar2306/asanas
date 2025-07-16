import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { StudioInfo } from "../../types/studio";
import {
  getStudioInfoFromFirestore,
  saveStudioInfoToFirestore,
} from "../../api/studio";
import studioData from "../../mocks/studio.json";
import StudioDetailForm from "../../components/Studio/StudioDetailForm";

export const studioSchema = yup.object().shape({
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
  address: yup.object().shape({
    address1: yup.string().nullable(),
    address2: yup.string().nullable(),
    city: yup.string().nullable(),
    state: yup.string().nullable(),
    country: yup.string().required("Country is required."),
    pincode: yup.string().nullable(),
  }),
});

const StudioDetails: React.FC = () => {
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(studioData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function fetchStudio() {
      const data = await getStudioInfoFromFirestore("default");
      if (data) setStudioInfo(data);
    }
    fetchStudio();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await studioSchema.validate(studioInfo, { abortEarly: false });
      setErrors({});
      console.log("Saving studio info:", studioInfo);
      // Save studio info to Firestore
      await saveStudioInfoToFirestore(studioInfo);
      // Optionally show a success message or redirect
      alert("Studio info saved successfully!");
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

  const postalCodeLabel =
    studioInfo.address.country === "India" ? "Pincode" : "Zip Code";
  const currencySymbol = studioInfo.address.country === "India" ? "INR" : "USD";

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
        <StudioDetailForm
          studioInfo={studioInfo}
          setStudioInfo={setStudioInfo}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default StudioDetails;
