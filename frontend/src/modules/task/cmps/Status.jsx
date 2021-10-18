import React from "react";

export const Status = ({ onEditStatus, type, clr, children }) => {
  return (
    <div
      className="status"
      onClick={() => {
        onEditStatus(type, clr);
      }}
      style={{ backgroundColor: clr }}
    >
      {children}
    </div>
  );
};
