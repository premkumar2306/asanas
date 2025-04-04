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