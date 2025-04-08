import React, { useState } from "react";

interface Student {
  name: string;
  avatar: string;
}
import { Link } from "react-router-dom";

interface RecentClass {
  id: number;
  date: string;      // e.g. "Today", "Mon, 19 Oct"
  location: string;  // e.g. "Zoom class", "In-studio"
  teacher: string;
  time: string;      // e.g. "6:05AM"
  checkins: number;  // number of check-ins
  students: Student[]; // list of student objects
}

const RecentClasses: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<RecentClass | null>(null);

  const StudentListModal: React.FC<{
    classItem: RecentClass;
    students: Student[];
    onClose: () => void;
  }> = ({ classItem, students, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h3 className="text-lg font-semibold mb-2">
            Students in {classItem.teacher}'s class at {classItem.time}
          </h3>
          <ul className="space-y-2 mb-4">
            {students.map((student, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                <span className="text-sm">{student.name}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button onClick={onClose} className="text-sm text-gray-600">Close</button>
          </div>
        </div>
      </div>
    );
  };

  // Dummy data
  const recentClasses: RecentClass[] = [
    { id: 1, date: "Today",        location: "Zoom class", teacher: "Vaidy Bala", time: "6:05AM", checkins: 0, students: [] },
    { id: 2, date: "Mon, 19 Oct",  location: "Zoom class", teacher: "Vaidy Bala", time: "2:00PM", checkins: 2, students: [
        { name: "Lakshmi", avatar: "https://i.pravatar.cc/40?img=1" },
        { name: "Ravi", avatar: "https://i.pravatar.cc/40?img=2" }
      ]
    },
    { id: 3, date: "Mon, 19 Oct",  location: "Zoom class", teacher: "Janaki G",   time: "5:21AM", checkins: 5, students: [
        { name: "Anita", avatar: "https://i.pravatar.cc/40?img=3" },
        { name: "Kiran", avatar: "https://i.pravatar.cc/40?img=4" },
        { name: "Ramesh", avatar: "https://i.pravatar.cc/40?img=5" },
        { name: "Divya", avatar: "https://i.pravatar.cc/40?img=6" },
        { name: "Sita", avatar: "https://i.pravatar.cc/40?img=7" }
      ]
    },
    { id: 4, date: "Tue, 20 Oct",  location: "In-studio",  teacher: "Sneha Rao",  time: "8:00AM", checkins: 3, students: [
        { name: "Karthik", avatar: "https://i.pravatar.cc/40?img=8" },
        { name: "Preeti", avatar: "https://i.pravatar.cc/40?img=9" },
        { name: "Manoj", avatar: "https://i.pravatar.cc/40?img=10" }
      ]
    },
    { id: 5, date: "Tue, 20 Oct",  location: "Zoom class", teacher: "Arjun Iyer", time: "6:00PM", checkins: 1, students: [
        { name: "Meera", avatar: "https://i.pravatar.cc/40?img=11" },
        { name: "Rahul", avatar: "https://i.pravatar.cc/40?img=12" }
      ]
    },
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
              <th className="py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentClasses.map((cls) => (
              <tr key={cls.id} className="border-b last:border-0">
                <td className="py-2 px-4">
                  {cls.date === "Today" && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mr-2">Today</span>}
                  {cls.date}
                </td>
                <td className="py-2 px-4">{cls.location}</td>
                <td className="py-2 px-4">{cls.teacher}</td>
                <td className="py-2 px-4">{cls.time}</td>
                <td className="py-2 px-4">
                  {cls.checkins > 0 ? (
                    <button
                      onClick={() => setSelectedClass(cls)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {cls.checkins} Check-ins
                    </button>
                  ) : (
                    <span className="text-gray-400">No check-ins</span>
                  )}
                </td>
                <td className="py-2 px-4 space-x-2">
                  <Link to={`/classes/${cls.id}`} className="text-sm text-blue-600 hover:underline">View</Link>
                  <Link to={`/classes/${cls.id}/edit`} className="text-sm text-yellow-600 hover:underline">Edit</Link>
                  <button className="text-sm text-green-600 hover:underline">Check-in</button>
                </td>
              </tr>
            ))}
            {recentClasses.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                  No recent classes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedClass && (
        <StudentListModal
          classItem={selectedClass}
          students={selectedClass.students}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </div>
  );
};

export default RecentClasses;