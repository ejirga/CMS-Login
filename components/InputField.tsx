
import React, { ChangeEvent, FocusEvent } from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, onBlur, error, placeholder, children }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
            error
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/50'
          } ${children ? 'pr-10' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {children && (
           <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
             {children}
           </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
