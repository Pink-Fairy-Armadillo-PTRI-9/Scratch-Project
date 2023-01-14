import React from 'react';

export default function Submit({ value, onClick }) {
  return (
    <button
      type="submit"
      className="w-full rounded bg-white text-dark-gray-600 hover:bg-opacity-90 hover:text-dark-purple transition font-semibold text-lg cursor-pointer p-1"
      value={value}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
