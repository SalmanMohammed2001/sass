import React from 'react';

interface CustomButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void | {};              
  children: React.ReactNode;        
  className?: string;                
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  onClick = () => {},
  children,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-none p-[10px] text-white bg-orange-600 text-[14px] cursor-pointer rounded-md ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
