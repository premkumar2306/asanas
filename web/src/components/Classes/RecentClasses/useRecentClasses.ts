import { useState, useEffect } from "react";
import { RecentClass } from "./types";

export const useRecentClasses = () => {
  const [recentClasses, setRecentClasses] = useState<RecentClass[]>([]);

  useEffect(() => {
    // Sample data with students
    const dummyData: RecentClass[] = [
      {
        id: 1,
        date: "Today",
        location: "Zoom class",
        teacher: "Vaidy Bala",
        time: "6:05AM",
        checkins: 0,
        students: []
      },
      {
        id: 2,
        date: "Mon, 19 Oct",
        location: "Zoom class",
        teacher: "Vaidy Bala",
        time: "2:00PM",
        checkins: 2,
        students: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://via.placeholder.com/40"
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            avatar: "https://via.placeholder.com/40"
          }
        ]
      },
      {
        id: 3,
        date: "Mon, 19 Oct",
        location: "Zoom class",
        teacher: "Janaki G",
        time: "5:21AM",
        checkins: 5,
        students: [
          {
            id: 3,
            name: "Alice Johnson",
            email: "alice@example.com",
            avatar: "https://via.placeholder.com/40"
          },
          {
            id: 4,
            name: "Bob Wilson",
            email: "bob@example.com",
            avatar: "https://via.placeholder.com/40"
          },
          {
            id: 5,
            name: "Carol Brown",
            email: "carol@example.com",
            avatar: "https://via.placeholder.com/40"
          }
        ]
      }
    ];

    setRecentClasses(dummyData);
  }, []);

  return { recentClasses };
};
