import { bottom } from "@popperjs/core";
import { useState } from "react";
import { usePopper } from "react-popper";
import { useClickOutside } from "../hooks/clickOutSide";

export const Popper = ({
  button,
  popper,
  placementChange,
  disappearOnPopperClick = true,
  x,
  y,
}) => {
  const [buttonElement, setButtonElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const [isOpen, setIsOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  let { styles, attributes } = usePopper(buttonElement, popperElement, {
    placement: placementChange ? placementChange : bottom,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [y ? y : 0, x ? x : 0],
        },
      },
    ],
  });

  return (
    <div
    ref={domNode}
      onClick={() => {
        disappearOnPopperClick && setIsOpen(!isOpen);
      }}
    >
      <div
        ref={setButtonElement}
        onClick={() => {
          !disappearOnPopperClick && setIsOpen(!isOpen);
        }}
      >
        {button}
      </div>
      {isOpen && (
        <div
          ref={setPopperElement}
          style={{ zIndex: '5', ...styles.popper }}
          {...attributes.popper}
        >
          {popper}
        </div>
      )
      }
    </div >
  );
};
