export interface Student {
  name: string;
  avatar: string;
}

export interface RecentClass {
  id: string | number;
  date: string;
  location: string;
  teacher: string;
  time: string;
  checkins: number;
  students: Student[];
  timestamp?: number;
}