// src/components/PlansPricing/types.ts
import { DiscountCode } from "../../types/index";

export interface PlanData {
  id: number;
  service: string;
  name: string;
  description: string;
  specialInstructions: string;
  accessType: "online" | "in-studio" | "both";
  paymentModel: "standard" | "donation" | "free";
  renewalReminders: boolean;
  subscriptionStartDate: string;
  restrictType: "all" | "segments" | "emails";
  restrictEmails: string;
  geoPricing: string;
  price: string;
  isPublic: boolean;
  active: boolean;
  countryPricing: { country: string; price: string }[];
  termMonths: number;
  termAndClasses?: string;
  eligibleClasses?: string[];
  discountCodes?: DiscountCode[];
  trialDropIn?: boolean;
  locationId?: string; // <-- Add this field to associate with a studio location
}

export const initialPlans: PlanData[] = [
  {
    id: 1,
    service: "Group Classes",
    name: "Hatha Beginners & Breathwork",
    description: "Basic Hatha Yoga. Gentle flow. Suitable for new students.",
    specialInstructions:
      "Arrive 10 mins early. Comfortable clothing recommended.",
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
  {
    id: 2,
    service: "Workshops",
    name: "Headstand Workshop - 2 days",
    description: "Learn fundamentals of headstand safely in a 2-day workshop.",
    specialInstructions:
      "Practice caution. If you have neck injuries, consult first.",
    accessType: "both",
    paymentModel: "donation",
    renewalReminders: false,
    subscriptionStartDate: "2025-05-01",
    restrictType: "emails",
    restrictEmails: "friend@example.com, another@example.com",
    geoPricing: "multi-currency",
    price: "INR 150 / USD 25",
    isPublic: false,
    active: true,
    countryPricing: [],
  },
  {
    id: 3,
    service: "Personal Classes",
    name: "Vinyasa Flow Advanced",
    description: "A challenging Vinyasa flow for advanced practitioners.",
    specialInstructions: "Prepare to sweat! Bring a towel.",
    accessType: "online",
    paymentModel: "standard",
    renewalReminders: true,
    subscriptionStartDate: "",
    restrictType: "all",
    restrictEmails: "",
    geoPricing: "single",
    price: "USD 50",
    isPublic: true,
    active: true,
    countryPricing: [],
  },
  {
    id: 4,
    service: "Video Courses",
    name: "Yoga for Flexibility",
    description: "A video course focused on improving flexibility.",
    specialInstructions: "Watch at your own pace.",
    accessType: "online",
    paymentModel: "free",
    renewalReminders: false,
    subscriptionStartDate: "",
    restrictType: "all",
    restrictEmails: "",
    geoPricing: "single",
    price: "Free",
    isPublic: true,
    active: true,
    countryPricing: [],
  },
  {
    id: 5,
    service: "Workshops",
    name: "Meditation & Mindfulness Workshop",
    description: "An intensive workshop on meditation techniques.",
    specialInstructions: "Quiet environment required.",
    accessType: "both",
    paymentModel: "donation",
    renewalReminders: false,
    subscriptionStartDate: "2025-06-01",
    restrictType: "segments",
    restrictEmails: "",
    geoPricing: "south-asia-only",
    price: "INR 500 / USD 10",
    isPublic: false,
    active: true,
    countryPricing: [],
  },
];
