import React from "react";
import { Link } from "react-router-dom";

interface RecentClass {
  id: number;
  date: string;      // e.g. "Today", "Mon, 19 Oct"
  location: string;  // e.g. "Zoom class", "In-studio"
  teacher: string;
  time: string;      // e.g. "6:05AM"
  checkins: number;  // number of check-ins
}

const RecentClasses: React.FC = () => {
  // Dummy data
  const recentClasses: RecentClass[] = [
    { id: 1, date: "Today",        location: "Zoom class", teacher: "Vaidy Bala", time: "6:05AM", checkins: 0 },
    { id: 2, date: "Mon, 19 Oct",  location: "Zoom class", teacher: "Vaidy Bala", time: "2:00PM", checkins: 2 },
    { id: 3, date: "Mon, 19 Oct",  location: "Zoom class", teacher: "Janaki G",   time: "5:21AM", checkins: 5 },
    { id: 4, date: "Tue, 20 Oct",  location: "In-studio",  teacher: "Sneha Rao",  time: "8:00AM", checkins: 3 },
    { id: 5, date: "Tue, 20 Oct",  location: "Zoom class", teacher: "Arjun Iyer", time: "6:00PM", checkins: 1 },
  ];

  return (
    <div className="p-4 bg-white rounded shadow max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Recent group classes</h2>
        <Link to="/all-group-classes" className="text-blue-600 hover:underline">
          See All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Location</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Teacher</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Time</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Students</th>
            </tr>
          </thead>
          <tbody>
            {recentClasses.map((cls) => (
              <tr key={cls.id} className="border-b last:border-0">
                <td className="py-2 px-4">{cls.date}</td>
                <td className="py-2 px-4">{cls.location}</td>
                <td className="py-2 px-4">{cls.teacher}</td>
                <td className="py-2 px-4">{cls.time}</td>
                <td className="py-2 px-4">
                  {cls.checkins}{" "}
                  <Link to="/check-ins" className="text-sm text-blue-600 hover:underline">
                    Check-ins
                  </Link>
                </td>
              </tr>
            ))}
            {recentClasses.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                  No recent classes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentClasses;