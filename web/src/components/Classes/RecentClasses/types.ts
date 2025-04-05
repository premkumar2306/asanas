export interface Student {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface RecentClass {
  id: number;
  date: string;
  location: string;
  teacher: string;
  time: string;
  checkins: number;
  students?: Student[];
}
