import React from 'react';

const Dialog = ({ message, onDialog }) => {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-black-100">
      <div className="flex flex-col items-center text-center align-middle justify-center absolute top-1/4 left-1/3 -translate-x-50 -translate-y-50 bg-white p-48">
        <h3 className="mb-2 text-red-700 text-lg font-semibold">{message}</h3>
        <div className="flex items-center">
          <button className="bg-primary text-white w-full py-2 px-4 rounded-md mr-4 border-none cursor-pointer" onClick={() => onDialog(true)}>
            Yes
          </button>
          <button className="bg-green-500 text-white w-full py-2 px-4 rounded-md border-none cursor-pointer" onClick={() => onDialog(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
