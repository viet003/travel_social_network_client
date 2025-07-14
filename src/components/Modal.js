import React from "react";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      style={{ background: open ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)' }}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative transform transition-all duration-300 ${open ? 'scale-100' : 'scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute text-xl font-bold text-gray-400 top-2 right-2 hover:text-gray-600 focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal; 