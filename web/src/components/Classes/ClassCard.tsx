import React from 'react';
import { Button } from '../common/Button';
import { ClassItem } from './types';
import { IoTime, IoPerson, IoWallet, IoEllipsisVertical } from 'react-icons/io5';

interface ClassCardProps {
  classItem: ClassItem;
  onEdit?: (cls: ClassItem) => void;
  onDelete?: (id: number) => void;
  onCheckIns?: (cls: ClassItem) => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  classItem,
  onEdit,
  onDelete,
  onCheckIns,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{classItem.title}</h3>
            <span className={`
              inline-block
              px-2
              py-1
              text-xs
              rounded-full
              ${classItem.type === 'group' ? 'bg-blue-100 text-blue-800' :
                classItem.type === 'personal' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'}
            `}>
              {classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)}
            </span>
          </div>
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              icon={IoEllipsisVertical}
              className="!p-1"
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
              <div className="py-1">
                {onEdit && (
                  <button
                    onClick={() => onEdit(classItem)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                )}
                {onCheckIns && (
                  <button
                    onClick={() => onCheckIns(classItem)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Check-ins
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(classItem.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <IoTime className="w-4 h-4 mr-2" />
            <span>{classItem.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <IoPerson className="w-4 h-4 mr-2" />
            <span>{classItem.teacher}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <IoWallet className="w-4 h-4 mr-2" />
            <span>{classItem.fees}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          {classItem.students && (
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {classItem.students.slice(0, 3).map((student) => (
                  <img
                    key={student.id}
                    className="w-6 h-6 rounded-full border-2 border-white"
                    src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}`}
                    alt={student.name}
                  />
                ))}
              </div>
              {classItem.students.length > 3 && (
                <span className="ml-2 text-sm text-gray-500">
                  +{classItem.students.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};