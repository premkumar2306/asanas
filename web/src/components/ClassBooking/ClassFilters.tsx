import React from 'react';

interface ClassFiltersProps {
  selectedLevel: string;
  selectedDay: string;
  onLevelChange: (level: string) => void;
  onDayChange: (day: string) => void;
}

export const ClassFilters: React.FC<ClassFiltersProps> = ({
  selectedLevel,
  selectedDay,
  onLevelChange,
  onDayChange,
}) => (
  <div className="mb-8 flex space-x-4">
    <select
      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      value={selectedLevel}
      onChange={(e) => onLevelChange(e.target.value)}
    >
      <option value="all">All Levels</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>

    <select
      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      value={selectedDay}
      onChange={(e) => onDayChange(e.target.value)}
    >
      <option value="all">All Days</option>
      <option value="monday">Monday</option>
      <option value="tuesday">Tuesday</option>
      <option value="wednesday">Wednesday</option>
      <option value="thursday">Thursday</option>
      <option value="friday">Friday</option>
      <option value="saturday">Saturday</option>
      <option value="sunday">Sunday</option>
    </select>
  </div>
);