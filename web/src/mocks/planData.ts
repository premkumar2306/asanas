import { PlanData, SessionPlan } from '../types';

export const initialPlans: PlanData[] = [
  {
    id: 1,
    service: "Group Classes",
    name: "Hatha Beginners & Breathwork",
    description: "Basic Hatha Yoga. Gentle flow. Suitable for new students.",
    specialInstructions: "Arrive 10 mins early. Comfortable clothing recommended.",
    accessType: "online",
    paymentModel: "standard",
    renewalReminders: true,
    subscriptionStartDate: "",
    restrictType: "all",
    restrictEmails: "",
    geoPricing: "single",
    price: "INR 2000",
    isPublic: true,
    active: true,
    countryPricing: [],
  },
  // ... rest of the plans
];

export const mockSessionPlans: SessionPlan[] = [
  {
    id: "1",
    batchTitle: "Roots – 7:15 PM IST",
    level: "Beginner to Intermediate.",
    notes: "Factoring to Daylight Savings,\nRoots 6:15 pm IST will be scheduled to 7:15",
    startDate: "01-May-2025",
    price: 66,
    sessions: 20,
    duration: "1 month",
  },
  // ... rest of the session plans
];