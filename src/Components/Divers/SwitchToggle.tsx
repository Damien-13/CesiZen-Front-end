import React from 'react';

interface SwitchToggleProps {
  checked: boolean;
  onToggle: () => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ checked, onToggle }) => {
  return (
    
    <button
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
        checked
          ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-700'
          : 'bg-gradient-to-r from-red-500 via-red-600 to-red-700'
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
          checked ? 'translate-x-6' : ''
        }`}
      />
    </button>
  );
};

export default SwitchToggle;
