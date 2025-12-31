import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, className = '' }) => {
  return (
    <div className={`relative inline-block w-14 h-8 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        onClick={() => onChange(!checked)}
        className={`block w-full h-full rounded-full cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          checked ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      />
      <div
        className={`absolute top-0.5 left-0.5 bg-white w-7 h-7 rounded-full transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          checked ? 'transform translate-x-7' : ''
        } shadow-md flex items-center justify-center`}
      />
    </div>
  );
};

export default Switch;