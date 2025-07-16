export interface ClassFormData {
  id?: string;
  service: "group" | "personal" | "workshop";
  zoomUser?: string;
  startsAt: string;
  duration: number;
  recurringDays: string[];
  teacher: string;
  description: string;
  classType: "online" | "in-studio" | "hybrid";
  maxCapacity?: number;
  paymentModel: "standard" | "donation" | "free";
  trialDropIn: boolean;
  eligiblePlans: string[];
  discountCodes: string[];
  shareRecording: boolean;
  autoRecord: boolean;
  enforceFormFill: boolean;
  subscriptionStartDate?: string;
}

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const INITIAL_CLASS_DATA: ClassFormData = {
  service: "group",
  startsAt: "",
  duration: 60,
  recurringDays: [],
  teacher: "",
  description: "",
  classType: "online",
  paymentModel: "standard",
  trialDropIn: false,
  eligiblePlans: [],
  discountCodes: [],
  shareRecording: false,
  autoRecord: false,
  enforceFormFill: false,
};
