import React from 'react';

// create container for the app - pass classes down as props
export default function Container({ children, className }) {
  return <div className={'max-w-screen-xl mx-auto px-2' + className}>{children}</div>;
}
