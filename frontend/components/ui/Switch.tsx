import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, className = '' }) => {
  return (
    <div className={`relative inline-block cursor-pointer w-10 h-6 mx-1 ${className}`}
      onClick={() => onChange(!checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`block w-full h-full rounded-full transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          checked ? 'bg-green-400' : 'bg-red-400'
        }`}
      />
      <div
        className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          checked ? 'transform translate-x-4' : ''
        } shadow-md flex items-center justify-center`}
      />
    </div>
  );
};

export default Switch;