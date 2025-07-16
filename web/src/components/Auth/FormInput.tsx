import React from "react";
import type { IconType } from "react-icons";

interface FormInputProps {
  type: "email" | "password" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  Icon: IconType;
}

export const FormInput: React.FC<FormInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  required = false,
  Icon,
}) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};
