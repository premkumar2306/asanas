import React from 'react';
import { ClassItem } from '../../pages/Classes/types';

interface ClassesTableProps {
  classes: ClassItem[];
  onEdit: (cls: ClassItem) => void;
  onDelete: (id: number) => void;
}

export default function ClassesTable({ classes, onEdit, onDelete }: ClassesTableProps) {
  return (
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
        {classes.map((cls) => (
          <tr key={cls.id} className="border-b last:border-0">
            <td className="py-3 px-4">{cls.title}</td>
            <td className="py-3 px-4">{cls.time}</td>
            <td className="py-3 px-4">{cls.teacher}</td>
            <td className="py-3 px-4">{cls.fees}</td>
            <td className="py-3 px-4 space-x-2">
              <button
                onClick={() => onEdit(cls)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(cls.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}