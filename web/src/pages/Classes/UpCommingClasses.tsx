import React, { useState, useEffect } from "react";
import ClassForm from "../../components/Classes/ClassForm";
import { ClassFormData } from "../../components/Classes/types";
import { CheckInsModal } from '../../components/Classes/CheckInsModal';

interface ClassItem {
  id: number;
  date: string; // e.g. "Today", "Tomorrow"
  title: string;
  time: string;
  teacher: string;
  type: "group" | "personal" | "workshop" | "video";
  fees: string;
  canStart: boolean;
  students?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    checkInTime?: string;
  }[];
}

export default function UpCommingClasses() {
  const [currentTab, setCurrentTab] = useState<"all" | "group" | "personal" | "workshop">("all");
  const [currentTime, setCurrentTime] = useState("");
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState<ClassItem | null>(null);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("en-IN", { timeZoneName: "short" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate dummy data (at least 15 classes) grouped by "Today" and "Tomorrow"
  useEffect(() => {
    const dummyClasses: ClassItem[] = [];
    // We'll simulate 10 classes for "Today" and 8 for "Tomorrow"
    for (let i = 1; i <= 10; i++) {
      dummyClasses.push({
        id: i,
        date: "Today",
        title: `Class ${i} ${i % 4 === 0 ? "Workshop" : i % 3 === 0 ? "Personal Session" : "Group Class"}`,
        time: `${6 + (i % 12)}:00 ${i % 2 === 0 ? "AM" : "PM"} IST`,
        teacher: i % 2 === 0 ? "Ravi" : "Sneha",
        type: i % 4 === 0 ? "workshop" : i % 3 === 0 ? "personal" : "group",
        fees: i % 3 === 0 ? "INR 500" : "Included in plan",
        canStart: i % 5 !== 0,
      });
    }
    for (let i = 11; i <= 18; i++) {
      dummyClasses.push({
        id: i,
        date: "Tomorrow",
        title: `Class ${i} ${i % 4 === 0 ? "Workshop" : i % 3 === 0 ? "Personal Session" : "Group Class"}`,
        time: `${6 + (i % 12)}:00 ${i % 2 === 0 ? "AM" : "PM"} IST`,
        teacher: i % 2 === 0 ? "Arjun" : "Meera",
        type: i % 4 === 0 ? "workshop" : i % 3 === 0 ? "personal" : "group",
        fees: i % 3 === 0 ? "USD 10" : "Included in plan",
        canStart: i % 5 !== 0,
      });
    }
    setClasses(dummyClasses);
  }, []);

  // Group classes by date
  const groupedClasses = classes.reduce((groups: { [date: string]: ClassItem[] }, cls) => {
    if (!groups[cls.date]) groups[cls.date] = [];
    groups[cls.date].push(cls);
    return groups;
  }, {});

  // Filter classes based on current tab
  const filterByType = (cls: ClassItem) => {
    if (currentTab === "all") return true;
    return cls.type === currentTab;
  };

  const handleOpenModal = (mode: 'create' | 'edit', classItem?: ClassItem) => {
    setFormMode(mode);
    setEditingClass(classItem || null);
    setShowModal(true);
  };

  const handleFormSubmit = (data: ClassFormData) => {
    if (formMode === 'create') {
      // Add new class
      const newClass: ClassItem = {
        id: Date.now(),
        date: new Date(data.startsAt).toLocaleDateString() === new Date().toLocaleDateString() ? "Today" : "Tomorrow",
        title: data.description,
        time: new Date(data.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " IST",
        teacher: data.teacher,
        type: data.service,
        fees: "Included in plan",
        canStart: true
      };
      setClasses(prev => [...prev, newClass]);
    } else if (editingClass) {
      // Update existing class
      setClasses(prev => prev.map(cls => 
        cls.id === editingClass.id
          ? {
              ...cls,
              title: data.description,
              teacher: data.teacher,
              type: data.service,
              time: new Date(data.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " IST",
            }
          : cls
      ));
    }
    setShowModal(false);
    setEditingClass(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses((prev) => prev.filter((cls) => cls.id !== id));
    }
  };

  const handleCheckInsClick = (cls: ClassItem) => {
    setSelectedClassForAttendance(cls);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Upcoming Classes</h1>
        <button
          onClick={() => handleOpenModal('create')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create New Class
        </button>
      </div>

      {/* Tabs */}
      <div className="space-x-4 mb-4">
        <button
          onClick={() => setCurrentTab("all")}
          className={`px-4 py-2 rounded ${
            currentTab === "all" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          All classes
        </button>
        <button
          onClick={() => setCurrentTab("group")}
          className={`px-4 py-2 rounded ${
            currentTab === "group" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Group classes
        </button>
        <button
          onClick={() => setCurrentTab("personal")}
          className={`px-4 py-2 rounded ${
            currentTab === "personal" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Personal classes
        </button>
        <button
          onClick={() => setCurrentTab("workshop")}
          className={`px-4 py-2 rounded ${
            currentTab === "workshop" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Workshops
        </button>
      </div>

      {/* Current Time */}
      <div className="text-sm text-gray-600 mb-4">
        Current time: <span className="font-medium">{currentTime}</span>
      </div>

      {/* Grouped Classes */}
      {Object.keys(groupedClasses)
        .sort()
        .map((date) => {
          const classesForDate = groupedClasses[date].filter(filterByType);
          if (classesForDate.length === 0) return null;
          return (
            <div key={date} className="mb-8">
              <h2 className="text-lg font-semibold mb-2">{date}</h2>
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Title</th>
                      <th className="py-3 px-4 font-semibold">Time</th>
                      <th className="py-3 px-4 font-semibold">Teacher</th>
                      <th className="py-3 px-4 font-semibold">Fees</th>
                      <th className="py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classesForDate.map((cls) => (
                      <tr key={cls.id} className="border-b last:border-0">
                        <td className="py-3 px-4">{cls.title}</td>
                        <td className="py-3 px-4">{cls.time}</td>
                        <td className="py-3 px-4">{cls.teacher}</td>
                        <td className="py-3 px-4">{cls.fees}</td>
                        <td className="py-3 px-4 space-x-2">
                          <button
                            onClick={() => handleOpenModal('edit', cls)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(cls.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleCheckInsClick(cls)}
                            className="text-green-600 hover:underline"
                          >
                            Check-ins
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

      {/* Modal for New/Edit Class */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {formMode === 'create' ? 'Create New Class' : 'Edit Class'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ClassForm
              initialData={editingClass ? {
                service: editingClass.type as 'group' | 'personal' | 'workshop',
                startsAt: new Date().toISOString(), // You might want to parse this from editingClass.time
                duration: 60,
                recurringDays: [],
                teacher: editingClass.teacher,
                description: editingClass.title,
                classType: 'online',
                paymentModel: 'standard',
                trialDropIn: false,
                eligiblePlans: [],
                discountCodes: [],
                shareRecording: false,
                autoRecord: false,
                enforceFormFill: false,
              } : undefined}
              onSubmit={handleFormSubmit}
              mode={formMode}
            />
          </div>
        </div>
      )}

      {selectedClassForAttendance && (
        <CheckInsModal
          classTitle={selectedClassForAttendance.title}
          date={selectedClassForAttendance.date}
          time={selectedClassForAttendance.time}
          teacher={selectedClassForAttendance.teacher}
          students={selectedClassForAttendance.students || []}
          onClose={() => setSelectedClassForAttendance(null)}
        />
      )}
    </div>
  );
}
