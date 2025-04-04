import React, { useState } from "react";
import CreateClassForm from "../components/Instructor/CreateClassForm";
import { ClassList } from "../components/ClassBooking/ClassList";
import { MOCK_CLASSES } from "../data/mockClasses";

const Instructor: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAdmin = true; // Replace with actual role check from your auth system

  const handleBookClass = async (classId: string) => {
    console.log("Class action:", classId);
    // Implement instructor-specific action here
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Class</h2>
          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              + New Class
            </button>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Create New Class</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <CreateClassForm onClose={() => setIsModalOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Current Classes</h2>
        <ClassList 
          classes={MOCK_CLASSES} 
          onBookClass={handleBookClass}
        />
      </section>
    </div>
  );
};

export default Instructor;
