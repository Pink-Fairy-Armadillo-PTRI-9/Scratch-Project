import React from 'react';

export default function Submit({ value, onClick }) {
  return (
    <button
      type="submit"
      className="w-full rounded bg-white text-secondary hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer p-1"
      value={value}
      onClick={onClick}
    >
      Submit
    </button>
  );
}
