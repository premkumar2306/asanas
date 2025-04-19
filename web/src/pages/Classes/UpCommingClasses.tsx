import React, { useState, useEffect } from "react";
import ClassForm from "../../components/Classes/ClassForm";
import { ClassFormData, INITIAL_CLASS_DATA } from "../../components/Classes/types";
import { CheckInsModal } from '../../components/Classes/CheckInsModal';
import { Button } from '../../components/common/Button';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { generateDummyClasses } from "../../mocks/upcomingClassesData";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

export default function UpcomingClasses() {
  const [currentTime, setCurrentTime] = useState("");
  const [classes, setClasses] = useState(generateDummyClasses());
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState(null);
  const [currentTab, setCurrentTab] = useState("all");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("en-IN", { timeZoneName: "short" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenModal = (mode: 'create' | 'edit', classItem?: ClassItem) => {
    setFormMode(mode);
    setEditingClass(classItem || null);
    setShowModal(true);
  };

  const handleFormSubmit = (data: ClassFormData) => {
    const weekday = new Date(data.startsAt).getDay();
    if (formMode === 'create') {
      const newClass = {
        id: Date.now(),
        date: new Date(data.startsAt).toLocaleDateString(),
        title: data.description,
        description: data.description,
        time: new Date(data.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " IST",
        teacher: data.teacher,
        type: data.service,
        fees: "Included in plan",
        canStart: true,
        timestamp: new Date(data.startsAt).getTime(),
        recurringDays: data.recurringDays,
      };
      setClasses(prev => [...prev, newClass]);
    } else if (editingClass) {
      const updatedTimestamp = new Date(data.startsAt).getTime();
      setClasses(prev =>
        prev.map(cls =>
          cls.id === editingClass.id
            ? {
                ...cls,
                title: data.description,
                description: data.description,
                teacher: data.teacher,
                type: data.service,
                timestamp: updatedTimestamp,
                startsAt: data.startsAt,
                time: new Date(data.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
                date: new Date(data.startsAt).toLocaleDateString(),
                recurringDays: data.recurringDays,
              }
            : cls
        )
      );
    }
    setShowModal(false);
    setEditingClass(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses((prev) => prev.filter((cls) => cls.id !== id));
    }
  };

  const filterByType = (cls: ClassItem) => {
    if (currentTab === "all") return true;
    return cls.type === currentTab;
  };

  const handleCreateClass = () => {
    setFormMode('create');
    setEditingClass(INITIAL_CLASS_DATA);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upcoming Classes Calendar</h1>
        <Button 
          variant="success" 
          onClick={handleCreateClass}
        >
          Create New Class
        </Button>
      </div>

      <div className="space-x-4 mb-4">
        {["all", "group", "personal", "workshop"].map(tab => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`px-4 py-2 rounded ${
              currentTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} classes
          </button>
        ))}
      </div>

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
            if (cls) handleOpenModal('edit', cls);
          }}
          selectable
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {formMode === 'create' ? 'Create New Class' : 'Edit Class'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingClass(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ClassForm
              initialData={formMode === 'create' ? INITIAL_CLASS_DATA : {
                ...editingClass,
                startsAt: new Date(editingClass.timestamp || Date.now()).toLocaleString('sv-SE').replace(' ', 'T').slice(0, 16),
              }}
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
