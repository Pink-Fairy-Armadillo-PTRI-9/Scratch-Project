import React from 'react';

export default function FormInput({ name, label, placeholder, type, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 border-dark-subtle w-full text-lg outline-none focus:border-gray-500 p-1 text-gray-500 peer transition"
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
      >
        {label}
      </label>
    </div>
  );
}
