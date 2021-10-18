import React from "react";

export const PopUpModal = ({ toggle, popup, isDark = true, ...props }) => {
  let className = isDark ? "modal darkModal" : "modal";

  return (
    <>
      <div
        hidden={toggle}
        className={className}
        onClick={(ev) => {
          props.toggleModal(ev);
        }}
      >
      </div>
      <div className={popup} onClick={(ev) => ev.stopPropagation()}>
        {props.children}
      </div>
    </>
  );
};
