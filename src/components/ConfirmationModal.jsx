import React from 'react';
import ReactDOM from 'react-dom';
import './ConfirmationModal.css';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  // Use a React Portal to render the modal at the root of the document
  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button style={{ backgroundColor: '#d32f2f', borderColor: '#d32f2f' }} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body // The modal will be appended to the <body> tag
  );
}