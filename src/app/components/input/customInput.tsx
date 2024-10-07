import React from 'react';

interface CustomInputProps {
  id: string;                      // Input ID
  name: string;                    // Input name
  type: string;                    // Input type (e.g., text, password, etc.)
  placeholder: string;             // Placeholder text
  value: string;                   // Input value
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  error?: string;                  // Optional error message
}

const CustomInput: React.FC<CustomInputProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  error = '',                     // Default value for error
}) => {
  return (
    <div className="flex flex-col gap-[5px]">
      <input
        id={id}
        name={name}
        className={`outline-none p-[10px] border-[#c9c9c9] border-2 border-solid rounded-md ${error ? 'border-red-600' : ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default CustomInput;
