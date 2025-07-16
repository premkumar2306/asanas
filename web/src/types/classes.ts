export interface Student {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  checkInTime?: string;
}

export interface RecentClass {
  id: number;
  title: string;
  date: string;
  location: string;
  teacher: string;
  time: string;
  checkins: number;
  students?: Student[];
}
