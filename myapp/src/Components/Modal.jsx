import React from 'react';

const Modal = ({ title=null, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      {/* Modal container */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4 text-center sm:p-0">
        <div className="relative bg-white rounded-lg shadow-xl sm:w-full sm:max-w-lg flex flex-col">
          {/* Modal header with close button */}
          <div className={`flex ${title ? "justify-between":"justify-end"} items-center p-4  border-gray-200`}>
            {
              title && <h3 className="text-xl font-semibold text-gray-900" id="modal-title">{title}</h3>
            }
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal content */}
          <div className="p-2 flex-1">
            {children}
          </div>          
        </div>
      </div>
    </div>
  );
};

export default Modal;
