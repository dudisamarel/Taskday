import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import FiberPinOutlinedIcon from "@material-ui/icons/FiberPinOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import HeightIcon from "@material-ui/icons/Height";
import ReorderTwoToneIcon from "@material-ui/icons/ReorderTwoTone";
import FormatColorFillSharpIcon from "@material-ui/icons/FormatColorFillSharp";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import { utilService } from "../../../shared/services/utilService";
import { Popper } from "../../../shared";
import { SmallSearchField } from "../../../shared/cmps/SmallSearchField";
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
      <section className="board-header-content-wrapper flex column">
        <div
          className="head flex justify-space-between align-center"
          style={{ width: "80vw" }}
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
          <div
            className="flex justify-space-between"
            style={{ width: "440px" }}
          >
            <button className="flex align-center">
              Last seen <AccountCircleIcon></AccountCircleIcon>
            </button>
            <Popper
              button={
                <button className="flex align-center">
                  Invite <PersonOutlineIcon></PersonOutlineIcon>
                </button>
              }
              popper={<InviteUsers board={board} onEditBoard={onEditBoard} />}
            />
            <Popper
              button={
                <button className="flex align-center">
                  Activity <TrendingUpIcon></TrendingUpIcon>
                </button>
              }
              popper={
                <Activities activities={board.activities} />
              }
            />

            <button>+ Add to Board</button>
            <button>
              <MoreHorizIcon></MoreHorizIcon>
            </button>
          </div>
        </div>
        <div ref={domNodeDescription}>
          {toggleDesc ? (
            <div onClick={() => setToggleDesc(!toggleDesc)}>
              <span>
                {descriptionInput === "" ? "Add description" : descriptionInput}
              </span>
            </div>
          ) : (
            <textarea
              name="description"
              style={{
                border: "1px solid black",
                width: "40vw",
                height: "10vh",

                resize: "none",
              }}
              placeholder="Add board description"
              onChange={descInputHandler}
              value={descriptionInput}
            />
          )}
        </div>
        <div
          className="flex justify-space-between"
          style={{
            width: "80vw",
            borderBottom: "1px solid lightgrey",
            paddingBottom: "5px",
          }}
        >
          <div
            style={{ margin: "5px" }}
            className="flex justify-space-between align-center"
          >
            <button style={{ padding: "10px", maxWidth: "180px" }} className="flex align-center">
              <HomeWorkOutlinedIcon></HomeWorkOutlinedIcon> Main Table
            </button>
            <span style={{ height: "50px", marginInlineStart: "5px", marginInlineEnd: "5px" }}></span>
            <button style={{ padding: "10px", maxWidth: "180px" }}>+ Add View</button>
          </div>
          <div className="flex">
            <div className="integrations-button-content flex">
              {/* <span>Icon</span> */}
              {/* <span>integrate</span> */}
              <div className="apps-badges-container">
                {/* <span>Icon</span>
                            <span>Icon</span>
                            <span>Icon</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="board-header-view-bar">
          <div className="monday-header flex">
            {/* <button onClick={onAddGroup}>New Item</button> */}
            <button className="basic-small-button" onClick={onAddGroup}>New Item</button>
            {/* <button className="flex align-center ">
              <SearchOutlinedIcon></SearchOutlinedIcon>
            </button> */}
            <SmallSearchField ></SmallSearchField>
            <button className="flex align-center tooltip">
              <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>{" "}
              <span className="tooltiptext">Filter By Person</span> Person
            </button>
            <button className="flex align-center tooltip">
              <FilterListOutlinedIcon></FilterListOutlinedIcon>{" "}
              <span className="tooltiptext">Filter By Anything</span> Filter{" "}
            </button>
            <button className="flex align-center tooltip">
              <ImportExportIcon></ImportExportIcon>{" "}
              <span className="tooltiptext">Sort By Any Column</span> Sort{" "}
            </button>
            <button className="flex align-center tooltip">
              <FiberPinOutlinedIcon></FiberPinOutlinedIcon>{" "}
              <span className="tooltiptext">Pin Columns</span>{" "}
            </button>
            <button className="flex align-center tooltip">
              <VisibilityOffOutlinedIcon></VisibilityOffOutlinedIcon>{" "}
              <span className="tooltiptext">Hidden Columns</span>{" "}
            </button>
            <button className="flex align-center tooltip">
              <HeightIcon></HeightIcon>
              <ReorderTwoToneIcon
                style={{ marginLeft: "-0.6rem" }}
              ></ReorderTwoToneIcon>{" "}
              <span className="tooltiptext">Item Height</span>
            </button>
            <button className="flex align-center tooltip">
              <FormatColorFillSharpIcon></FormatColorFillSharpIcon>{" "}
              <span className="tooltiptext">Condittional coloring</span>
            </button>
            <button className="flex align-center tooltip">
              <BorderColorOutlinedIcon></BorderColorOutlinedIcon>
              <span className="tooltiptext">Item default values</span>
            </button>
          </div>
        </div>
      </section>
    )
  );
};
