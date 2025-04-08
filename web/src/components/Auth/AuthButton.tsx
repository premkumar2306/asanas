import React from 'react';
import type { IconType } from 'react-icons';

interface AuthButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: IconType;
  children: React.ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  icon: Icon,
  children,
}) => {
  const baseStyles = "w-full flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {Icon && <Icon className="h-5 w-5 mr-2" />}
      {children}
    </button>
  );
};