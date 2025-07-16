import React, { useState } from "react";
import { Student } from "./types";
import { mockStudents } from "../../../mocks/studentData";

interface SearchStudentModalProps {
  onClose: () => void;
  onAddStudent: (student: Student) => void;
}

export const SearchStudentModal: React.FC<SearchStudentModalProps> = ({
  onClose,
  onAddStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddStudent = () => {
    if (selectedStudent) {
      onAddStudent(selectedStudent);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Student Check-in</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search student by name or email..."
            className="w-full px-4 py-2 border rounded-lg pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="max-h-60 overflow-y-auto mb-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className={`p-3 cursor-pointer rounded-lg flex items-center ${
                selectedStudent?.id === student.id
                  ? "bg-blue-50 border border-blue-200"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedStudent(student)}
            >
              <img
                src={student.avatar}
                alt={student.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-gray-600">{student.email}</div>
              </div>
            </div>
          ))}
          {filteredStudents.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No students found
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleAddStudent}
            disabled={!selectedStudent}
            className={`px-4 py-2 rounded ${
              selectedStudent
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Add Check-in
          </button>
        </div>
      </div>
    </div>
  );
};
