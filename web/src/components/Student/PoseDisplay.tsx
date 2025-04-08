import React from 'react';
import { Pose } from '../../types/pose';

interface PoseDisplayProps {
  pose: Pose;
  currentIndex: number;
  totalPoses: number;
  timeLeft: number;
}

export const PoseDisplay: React.FC<PoseDisplayProps> = ({
  pose,
  currentIndex,
  totalPoses,
  timeLeft,
}) => {
  return (
    <div className="pose my-4 max-w-xl w-full">
      <h3 className="text-xl font-semibold mb-2">{pose.name}</h3>
      <p className="text-gray-600 mb-1">Category: {pose.category}</p>
      <p className="text-gray-500 mb-4">
        Pose {currentIndex + 1} of {totalPoses} • Time left: {timeLeft}s
      </p>
      <img
        src={pose.image?.trim() || "https://via.placeholder.com/300x200?text=Yoga+Pose"}
        alt={pose.name}
        className="mx-auto mb-4 max-h-64 object-contain rounded shadow"
      />
      <div className="description mb-4">
        <h4 className="font-semibold mb-2">Instructions:</h4>
        <p className="text-left px-4">{pose.description}</p>
      </div>
      <div className="benefits mb-4">
        <h4 className="font-semibold mb-2">Benefits:</h4>
        <ul className="list-disc list-inside text-left px-4">
          {pose.benefits.map((benefit, idx) => (
            <div>
              <li key={idx}>{benefit}</li>
              <li key={idx}>{benefit}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};