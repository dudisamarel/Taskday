import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { utilService } from "../../../shared/services/utilService";
import { Popper } from "../../../shared";
import { InviteUsers } from "../../../shared/cmps/InviteUsers";
import { useEffect, useState } from "react";
import { useClickOutside } from "../../../shared/hooks/clickOutSide";
import { Activities } from "./Activities";
import { activitesActions } from "../../../shared/services/activityService";

export const BoardHeader = ({ board, onEditBoard }) => {
  const [descriptionInput, setDescriptionInput] = useState(board?.description);
  const [titleInput, setTitleInput] = useState(board?.title);
  const [toggleDesc, setToggleDesc] = useState(true);
  const [toggleTitle, setToggleTitle] = useState(true);

  const onAddGroup = () => {
    const group = {
      _id: utilService.makeId(),
      title: "New Group",
      tasks: [],
    };
    board.groups.unshift(group);
    onEditBoard({ type: activitesActions.ADD_GROUP });
  };
  useEffect(() => {
    if (board) {
      setDescriptionInput(board.description);
      setTitleInput(board.title);
    }
  }, [board]);

  const descInputHandler = (ev) => {
    setDescriptionInput(ev.target.value);
  };
  const titleInputHandler = (ev) => {
    setTitleInput(ev.target.value);
  };

  let domNodeDescription = useClickOutside(() => {
    if (toggleDesc === false) {
      setToggleDesc(true);
      if (board.description === descriptionInput) return;
      board.description = descriptionInput;
      onEditBoard();
    }
  });
  let domNodeTitle = useClickOutside(() => {
    if (toggleTitle === false) {
      setToggleTitle(true);
      if (board.title === titleInput) return;
      board.title = titleInput;
      onEditBoard();
    }
  });

  return (
    board && (
      <div className="board-header-content-wrapper flex column">
        <div
          className="head flex column"

        >
          <div ref={domNodeTitle}>
            {toggleTitle ? (
              <h1
                className="board-title"
                onClick={() => setToggleTitle(!toggleTitle)}
              >
                {titleInput && titleInput.length > 15
                  ? titleInput.slice(0, 15) + "..."
                  : titleInput}
              </h1>
            ) : (
              <input
                className="board-title-edit"
                type="text"
                name="title"
                onChange={titleInputHandler}
                value={titleInput}
              />
            )}
          </div>
          <div ref={domNodeDescription} className="desc">
            {toggleDesc ? (
              <div className="ellipsis" onClick={() => setToggleDesc(!toggleDesc)}>
                <span>
                  {descriptionInput === "" ? "Add description" : descriptionInput}
                </span>
              </div>
            ) : (
              <textarea
                name="description"
                style={{

                }}
                placeholder="Add board description"
                onChange={descInputHandler}
                value={descriptionInput}
              />
            )}
          </div>
          <div
            className="flex header-options align-center "
          >
            <button className="newitem-btn" onClick={onAddGroup}>New Group</button>
            <Popper
              button={
                <button className="flex align-center invite">
                  Invite <PersonOutlineIcon></PersonOutlineIcon>
                </button>
              }
              popper={<InviteUsers board={board} onEditBoard={onEditBoard} />}
            />
            <Popper
              button={
                <button className="flex align-center activ">
                  Activity <TrendingUpIcon></TrendingUpIcon>
                </button>
              }
              popper={
                <Activities activities={board.activities} />
              }
            />

          </div>
        </div>
          <div
            className="spacer"
            style={{
              width: '100%',
              borderBottom: "1px solid lightgrey",
              marginBottom: "5px",
            }}
          />
        {/* <div className="filters-header flex justify-center">
          <button className="newitem-btn" onClick={onAddGroup}>New Group</button> */}
        {/* <div className="input-section flex align-center">
              <SearchOutlined />
              <input placeholder="Search.." />
            </div>
            <button className="flex align-center tooltip">
              <FilterListOutlinedIcon></FilterListOutlinedIcon>{" "}
              <span className="tooltiptext">Filter By Anything</span> Filter{" "}
            </button>
            <button className="flex align-center tooltip">
              <ImportExportIcon></ImportExportIcon>{" "}
              <span className="tooltiptext">Sort By Any Column</span> Sort{" "}
            </button> */}
        {/* </div>
        <div
          className="last-spacer"
          style={{
            width: '100%',
            borderBottom: "1px solid lightgrey",
            marginBottom: "4px",
          }}
        /> */}
      </div>
    )
  );
};
