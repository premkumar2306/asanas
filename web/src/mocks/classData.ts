import { ClassSession, ClassItem } from "../types";

export const MOCK_CLASSES: ClassSession[] = [
  {
    id: "1",
    title: "Morning Flow Yoga",
    description: "Start your day with energizing poses and breathing exercises",
    level: "beginner",
    time: "07:00 AM",
    duration: 60,
    gmeetLink: "https://meet.google.com/abc-defg-hij",
    price: 15,
    maxStudents: 20,
    enrolledStudents: 12,
    instructorId: "inst_1",
    recurring: true,
    recurringDays: ["monday", "wednesday", "friday"],
    createdAt: new Date(),
  },
  // ... rest of the mock classes from mockClasses.ts
];

export const UPCOMING_CLASSES: ClassItem[] = [
  {
    id: 1,
    date: "Today",
    title: "Yoga Basics",
    time: "9:00 AM IST",
    teacher: "John Doe",
    type: "group",
    fees: "Included in plan",
    canStart: true,
    students: [
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        avatar: "https://via.placeholder.com/40",
        checkInTime: "8:55 AM",
      },
      {
        id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        avatar: "https://via.placeholder.com/40",
        checkInTime: "8:58 AM",
      },
    ],
  },
  // ... rest of the mock classes from Classes/mockData.ts
];
