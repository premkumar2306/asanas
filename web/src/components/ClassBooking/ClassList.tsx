import React from 'react';
import { ClassSession } from '../../types';
import ClassBookingCard from './ClassBookingCard';

interface ClassListProps {
  classes: ClassSession[];
  onBookClass: (classId: string) => Promise<void>;
}

export const ClassList: React.FC<ClassListProps> = ({ classes, onBookClass }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {classes.map((cls) => (
      <ClassBookingCard
        key={cls.id}
        cls={cls}
        onBook={onBookClass}
      />
    ))}
  </div>
);
