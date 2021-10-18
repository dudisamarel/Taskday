import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import React, { useState } from "react";

export const BoardAdd = ({ toggleModal, onAdd, types }) => {
  const [board, setboard] = useState({
    title: "",
    cards: [],
    members: [],
    groups: [],
    type: "items",
    description: "Hello this is generic description, change me please",
  });

  const inputHandler = (ev) => {
    const { value } = ev.target;
    const targetName = ev.target.name;
    const boardCopy = { ...board };
    boardCopy[targetName] = value;
    setboard({ ...boardCopy });
  };

  return (
    <div className="flex column align-center add-board-container">
      <h1>Create board</h1>
      <input
        type="text"
        name="title"
        placeholder="Board name..."
        value={board.title}
        onChange={inputHandler}
      />


      <div className="close-container" onClick={(ev) => {
        toggleModal(ev);
      }}>
        <div className="leftright"></div>
        <div className="rightleft"></div>
      </div>


      <RadioGroup
        className="radio-group"
        id="type-radiogroup"
        defaultValue="Items"
        name="type"
        onChange={inputHandler}
      >
        {types.map((type, idx) => {
          return (
            <FormControlLabel
              key={idx}
              value={type}
              control={<Radio />}
              label={type}
            />
          );
        })}
      </RadioGroup>
        <button
          className="btn-add"
          onClick={(ev) => {
            onAdd(board, ev);
          }}
        >
          Create
        </button>
      </div>
      );
};
