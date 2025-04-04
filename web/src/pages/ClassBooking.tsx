import React from 'react';
import { useClassBooking } from '../hooks/useClassBooking';
import { ClassFilters } from '../components/ClassBooking/ClassFilters';
import { ClassList } from '../components/ClassBooking/ClassList';
import { LoadingSpinner } from '../components/Shared/LoadingSpinner';
import { EmptyState } from '../components/Shared/EmptyState';

const ClassBooking: React.FC = () => {
  const {
    filteredClasses,
    selectedLevel,
    selectedDay,
    isLoading,
    handleBookClass,
    setSelectedLevel,
    setSelectedDay,
  } = useClassBooking();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Classes</h1>

      <ClassFilters
        selectedLevel={selectedLevel}
        selectedDay={selectedDay}
        onLevelChange={setSelectedLevel}
        onDayChange={setSelectedDay}
      />

      {isLoading && <LoadingSpinner />}

      {!isLoading && filteredClasses.length === 0 && (
        <EmptyState message="No classes available for the selected filters." />
      )}

      {!isLoading && filteredClasses.length > 0 && (
        <ClassList classes={filteredClasses} onBookClass={handleBookClass} />
      )}
    </div>
  );
};

export default ClassBooking;
