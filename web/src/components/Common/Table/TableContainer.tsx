import React from "react";

interface TableContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const TableContainer: React.FC<TableContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
      overflow-x-auto
      bg-white
      rounded-lg
      shadow-sm
      border border-gray-200
      ${className}
    `}
    >
      {children}
    </div>
  );
};
