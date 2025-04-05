export interface ClassSession {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  time: string;
  duration: number;
  gmeetLink: string;
  price: number;
  maxStudents: number;
  enrolledStudents: number;
  recurring: boolean;
  recurringDays?: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: 'monthly' | 'quarterly' | 'yearly';
  classesPerMonth: number;
  features: string[];
}

export interface Booking {
  id: string;
  classId: string;
  studentId: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  bookingDate: Date;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  subscriptionId?: string;
  subscriptionStatus: 'active' | 'inactive';
  classesRemaining: number;
}


export interface DiscountCode {
  code: string;
  discount: string; // e.g. "10%", "INR 100", "USD 5"
}

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
  countryPricing?: { country: string; price: string }[];

  /* New Fields */
  termAndClasses?: string;             // e.g. "12 classes • Standard"
  eligibleClasses?: string[];          // list of class names or IDs
  discountCodes?: DiscountCode[];      // array of discount code objects
  trialDropIn?: boolean;              // whether there's a trial drop-in option
}