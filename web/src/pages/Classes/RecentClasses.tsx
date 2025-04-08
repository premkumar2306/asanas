import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TableContainer } from '../../components/Common/Table/TableContainer';
import { Table } from '../../components/Common/Table/Table';
import { Student, RecentClass } from "./types";
import dummyRecentClasses from "./recent_classes_90days.json";

const RecentClasses: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<RecentClass | null>(null);
  const [recentClasses, setRecentClasses] = useState<RecentClass[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const classesPerPage = 10;

  React.useEffect(() => {
    setRecentClasses(dummyRecentClasses);
  }, []);

  const filteredClasses = recentClasses.filter(cls => {
    const matchesTeacher = cls.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const timestamp = cls.timestamp || 0;
    const afterStart = !startDate || timestamp >= new Date(startDate + "T00:00:00").getTime();
    const beforeEnd = !endDate || timestamp <= new Date(endDate + "T23:59:59").getTime();
    return matchesTeacher && afterStart && beforeEnd;
  });

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

  const columns = [
    {
      header: 'Date',
      accessor: (cls: RecentClass) => (
        <div className="flex items-center">
          {cls.date === "Today" && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
              Today
            </span>
          )}
          {cls.date}
        </div>
      ),
      className: 'w-1/6'
    },
    { 
      header: 'Location', 
      accessor: 'location',
      className: 'w-1/6'
    },
    { 
      header: 'Teacher', 
      accessor: 'teacher',
      className: 'w-1/6'
    },
    { 
      header: 'Time', 
      accessor: 'time',
      className: 'w-1/6'
    },
    {
      header: 'Students',
      accessor: (cls: RecentClass) => (
        cls.checkins > 0 ? (
          <button
            onClick={() => setSelectedClass(cls)}
            className="text-blue-600 hover:underline"
          >
            {cls.checkins} Check-ins
          </button>
        ) : (
          <span className="text-gray-400">No check-ins</span>
        )
      ),
      className: 'w-1/6'
    },
    {
      header: 'Actions',
      accessor: (cls: RecentClass) => (
        <div className="space-x-2">
          <Link 
            to={`/classes/${cls.id}`}
            className="text-blue-600 hover:underline"
          >
            View
          </Link>
          <Link 
            to={`/classes/${cls.id}/edit`}
            className="text-yellow-600 hover:underline"
          >
            Edit
          </Link>
          <button
            className="text-green-600 hover:underline"
          >
            Check-in
          </button>
        </div>
      ),
      className: 'w-1/6'
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
      
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 space-y-2 md:space-y-0">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by teacher name..."
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm"
        />
      </div>

      <TableContainer>
        <Table
          columns={columns}
          data={filteredClasses.slice((currentPage - 1) * classesPerPage, currentPage * classesPerPage)}
          emptyMessage="No recent classes found."
          isLoading={false}
        />
      </TableContainer>

      {selectedClass && (
        <StudentListModal
          classItem={selectedClass}
          students={selectedClass.students}
          onClose={() => setSelectedClass(null)}
        />
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {Math.ceil(filteredClasses.length / classesPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredClasses.length / classesPerPage)))}
          disabled={currentPage === Math.ceil(filteredClasses.length / classesPerPage)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentClasses;
