import React, { useState } from "react";
import { RecentClass, Student } from "./types";
import { CheckInsModal } from "./CheckInsModal";
import { SearchStudentModal } from "./SearchStudentModal";

interface RecentClassesTableProps {
  classes: RecentClass[];
  onClassesUpdate: (updatedClasses: RecentClass[]) => void;
}

export const RecentClassesTable: React.FC<RecentClassesTableProps> = ({
  classes,
  onClassesUpdate,
}) => {
  const [selectedClass, setSelectedClass] = useState<RecentClass | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [activeClass, setActiveClass] = useState<RecentClass | null>(null);

  const handleCheckInsClick = (cls: RecentClass) => {
    setSelectedClass(cls);
  };

  const handleManualCheckIn = (cls: RecentClass) => {
    setActiveClass(cls);
    setShowSearchModal(true);
  };

  const handleAddStudent = (student: Student) => {
    if (!activeClass) return;

    const updatedClasses = classes.map((cls) => {
      if (cls.id === activeClass.id) {
        return {
          ...cls,
          checkins: (cls.checkins || 0) + 1,
          students: [
            ...(cls.students || []),
            {
              ...student,
              checkInTime: new Date().toLocaleTimeString(),
            },
          ],
        };
      }
      return cls;
    });

    onClassesUpdate(updatedClasses);
    setShowSearchModal(false);
    setActiveClass(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Teacher</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Check-ins</th>
              <th className="px-4 py-2">Manual Check-in</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id}>
                <td className="px-4 py-2">{cls.title}</td>
                <td className="px-4 py-2">{cls.teacher}</td>
                <td className="px-4 py-2">{cls.time}</td>
                <td className="px-4 py-2">{cls.checkins || 0}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleManualCheckIn(cls)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Add Student
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleCheckInsClick(cls)}
                    className="text-blue-600 hover:underline"
                  >
                    View Check-ins
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedClass && (
        <CheckInsModal
          classDetails={selectedClass}
          students={selectedClass.students || []}
          onClose={() => setSelectedClass(null)}
        />
      )}

      {showSearchModal && activeClass && (
        <SearchStudentModal
          onClose={() => {
            setShowSearchModal(false);
            setActiveClass(null);
          }}
          onAddStudent={handleAddStudent}
        />
      )}
    </>
  );
};
