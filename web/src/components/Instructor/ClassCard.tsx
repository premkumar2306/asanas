import React from "react";

interface ClassCardProps {
  title: string;
  time: string;
  duration: number;
  gmeetLink: string;
}

function ClassCard({ title, time, duration, gmeetLink }: ClassCardProps) {
  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="font-bold">{title}</h3>
      <p>Time: {time}</p>
      <p>Duration: {duration} mins</p>
      <a href={gmeetLink} target="_blank" rel="noreferrer" className="text-blue-500 underline">
        Join Class
      </a>
    </div>
  );
}

export default ClassCard;