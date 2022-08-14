import React from 'react';

const Loader = ({ text = 'Please, Hang Tight...' }) => {
  return <div className="text-lg font-extrabold text-primary align-middle justify-center text-center pt-60">{text}</div>;
};

export default Loader;
