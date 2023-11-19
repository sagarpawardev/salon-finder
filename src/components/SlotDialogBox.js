import React from 'react';

const SlotDialogBox = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog">
      <div className="dialog-content">
        <p>This is your dialog content.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SlotDialogBox;
