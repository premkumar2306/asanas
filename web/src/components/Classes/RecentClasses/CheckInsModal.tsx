import React from "react";
import { Student, RecentClass } from "./types";

interface CheckInsModalProps {
  classDetails: RecentClass;
  students: Student[];
  onClose: () => void;
}

export const CheckInsModal: React.FC<CheckInsModalProps> = ({
  classDetails,
  students,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Class Check-ins</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">Date:</span> {classDetails.date}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Time:</span> {classDetails.time}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Teacher:</span>{" "}
            {classDetails.teacher}
          </p>
        </div>

        {students.length > 0 ? (
          <ul className="space-y-3">
            {students.map((student) => (
              <li key={student.id} className="flex items-center space-x-3">
                <img
                  src={student.avatar || "https://via.placeholder.com/40"}
                  alt={student.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No students attended this class.</p>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
