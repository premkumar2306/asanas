import React from 'react';
import { ClassSession } from '../../types';

interface ClassBookingCardProps {
  cls: ClassSession;
  onBook: (classId: string) => void;
}

const ClassBookingCard: React.FC<ClassBookingCardProps> = ({ cls, onBook }) => {
  return (
    <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{cls.title}</h3>
            <p className="text-gray-500">{cls.description}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {cls.level}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Time:</span> {cls.time}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Duration:</span> {cls.duration} minutes
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Price:</span> ${cls.price}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Spots left:</span>{' '}
            {cls.maxStudents - cls.enrolledStudents}
          </p>
          {cls.recurring && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Days:</span>{' '}
              {cls.recurringDays?.join(', ')}
            </p>
          )}
        </div>

        <button
          onClick={() => onBook(cls.id)}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Book Class
        </button>
      </div>
    </div>
  );
};

export default ClassBookingCard;