import React, { useState, useEffect } from "react";
import ClassForm from "../../components/Classes/ClassForm";
import { ClassFormData } from "../../components/Classes/types";
import { CheckInsModal } from '../../components/Classes/CheckInsModal';
import { Button } from '../../components/common/Button';
import { IoAdd } from 'react-icons/io5';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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

  // Helper function to format date
  const formatDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' });
  };

  // Generate dummy data for next 30 days
  useEffect(() => {
    const dummyClasses: ClassItem[] = [];
    const today = new Date();

    // Generate classes for next 30 days
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      // Generate 2-4 classes per day
      const classesPerDay = Math.floor(Math.random() * 3) + 2;
      
      for (let j = 1; j <= classesPerDay; j++) {
        const classHour = 6 + (j * 2); // Spread classes throughout the day
        currentDate.setHours(classHour, 0, 0, 0);

        dummyClasses.push({
          id: Date.now() + (i * 100) + j,
          date: formatDate(currentDate),
          title: `Class ${j} ${j % 4 === 0 ? "Workshop" : j % 3 === 0 ? "Personal Session" : "Group Class"}`,
          time: `${classHour % 12 || 12}:00 ${classHour >= 12 ? 'PM' : 'AM'} IST`,
          teacher: j % 2 === 0 ? "Ravi" : "Sneha",
          type: j % 4 === 0 ? "workshop" : j % 3 === 0 ? "personal" : "group",
          fees: j % 3 === 0 ? "INR 500" : "Included in plan",
          canStart: currentDate.getTime() <= new Date().getTime(),
          timestamp: currentDate.getTime(), // Add timestamp for sorting
        });
      }
    }

    // Sort classes by timestamp
    dummyClasses.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    setClasses(dummyClasses);
  }, []);

  // Group classes by date
  const groupedClasses = classes.reduce((groups: { [date: string]: ClassItem[] }, cls) => {
    if (!groups[cls.date]) groups[cls.date] = [];
    groups[cls.date].push(cls);
    return groups;
  }, {});

  // Sort dates to ensure they appear in chronological order
  const sortedDates = Object.keys(groupedClasses).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    if (a === "Tomorrow") return -1;
    if (b === "Tomorrow") return 1;
    return new Date(a).getTime() - new Date(b).getTime();
  });

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

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Time', accessor: 'time' },
    { header: 'Teacher', accessor: 'teacher' },
    { header: 'Fees', accessor: 'fees' },
    {
      header: 'Actions',
      accessor: (cls: ClassItem) => (
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenModal('edit', cls)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCheckInsClick(cls)}
          >
            Check-ins
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(cls.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upcoming Classes Calendar</h1>
        <Button variant="success" onClick={() => handleOpenModal('create')}>
          Create New Class
        </Button>
      </div>

      {/* Tabs */}
      <div className="space-x-4 mb-4">
        <button
          onClick={() => setCurrentTab("all")}
          className={`px-4 py-2 rounded ${
            currentTab === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All classes
        </button>
        <button
          onClick={() => setCurrentTab("group")}
          className={`px-4 py-2 rounded ${
            currentTab === "group" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Group classes
        </button>
        <button
          onClick={() => setCurrentTab("personal")}
          className={`px-4 py-2 rounded ${
            currentTab === "personal" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Personal classes
        </button>
        <button
          onClick={() => setCurrentTab("workshop")}
          className={`px-4 py-2 rounded ${
            currentTab === "workshop" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Workshops
        </button>
      </div>

      {/* Current Time */}
      <div className="text-sm text-gray-600 mb-4">
        Current time: <span className="font-medium">{currentTime}</span>
      </div>

      <div style={{ height: "80vh" }}>
        <Calendar
          localizer={localizer}
          events={classes.filter(filterByType).map((cls) => ({
            id: cls.id,
            title: `${cls.teacher} - ${cls.time}`,
            start: new Date(cls.timestamp || 0),
            end: new Date((cls.timestamp || 0) + 60 * 60 * 1000),
            teacher: cls.teacher,
          }))}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={["month", "week", "day"]}
          onSelectEvent={(event) => {
            const cls = classes.find(c => c.id === event.id);
            if (cls) {
              handleCheckInsClick(cls);
            }
          }}
          selectable
          onSelectSlot={(slotInfo) => {
            console.log("Selected slot: ", slotInfo);
          }}
        />
      </div>

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
