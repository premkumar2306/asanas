export interface StudioAddress {
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country: string;
  pincode?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  capacity: number;
  amenities: string[];
  isActive: boolean;
  team?: string[]; // Array of TeamMember IDs
}

export interface StudioInfo {
  /* Basic Information */
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  emergencyContact: string;

  /* Online Presence */
  website: string;
  logoUrl: string;
  socialMedia: {
    instagramUrl: string;
    facebookUrl: string;
    youtubeUrl: string;
  };

  /* Schedule & Services */
  groupClassSchedule?: string;
  servicesEnabled: string[];
  serviceStartDate?: string;
  operatingHours: string;
  timeZone: string;

  /* Registration & Membership */
  registrationFee?: string;
  freeTrialsAllowed?: number;
  membershipOptions?: string;

  /* GST & Legal */
  gstRegistered: boolean;
  gstin?: string;

  /* Receipt Details */
  receiptHeading?: string;
  receiptFootnote?: string;

  /* Registered Address */
  address: StudioAddress;

  /* Locations */
  locations?: Location[];
  team?: any[]; // Add team field for Firestore compatibility
}
