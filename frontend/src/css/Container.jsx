import React from 'react';

// create container for the app - pass classes down as props
export default function Container({ children, className }) {
  return <div className={'mx-auto p-2' + className}>{children}</div>;
}
