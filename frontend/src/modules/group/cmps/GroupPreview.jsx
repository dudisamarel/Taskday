import { TaskList } from "../../task";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../../shared/hooks/clickOutSide";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Popper } from "../../index";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForever from "@material-ui/icons/DeleteForever";
import { activitesActions } from "../../../shared/services/activityService";
export const GroupPreview = ({ group, board, onEditBoard, onOpenUpdates }) => {
  const onRemoveGroup = (id) => {
    //REMOVE Group
    const groupToDelete = board.groups.find(group => group._id === id)
    board.groups = board.groups.filter((group) => group._id !== id);
    onEditBoard({ type: activitesActions.REMOVE_GROUP, group: groupToDelete });
  };
  
  const [toggleName, setToggleName] = useState(true);
  const [groupTitle, setGroupTitle] = useState(group.title);
  const inputHandler = (ev) => {
    setGroupTitle(ev.target.value);
  };
  let domNode = useClickOutside(() => {
    if (toggleName === false) {
      setToggleName(true);
      if (group.title !== groupTitle) {
        group.title = groupTitle;
        onEditBoard();
      }
    }
  });
  
  const titleRef = useRef(null);
  useEffect(() => {
    if (titleRef.current)
      titleRef.current.focus()
  }, [toggleName])
  return (
    <div style={{ marginBottom: "30px" }}>
      <div className="grid-tasks-layout" style={{ marginBottom: "5px" }}>
        <div className="settings " >
          <Popper
            button={<div className="flex align-center">
              <KeyboardArrowDownIcon />
            </div>
            }
            popper={
              <div className="flex column edit-menu" >
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onRemoveGroup(group._id);
                  }}
                >
                  <DeleteForever /> Delete
                </button>
                <button onClick={() => setToggleName(!toggleName)}><EditIcon /> Rename</button>
              </div>
            }
          />
        </div>
        <div ref={domNode} className=" title group-title ellipsis">
          {toggleName ? (
            <span
              onClick={() => setToggleName(!toggleName)}
            >
              {groupTitle}
            </span>
          ) : (
            <input
              style={{ width: '100%' }}
              className="group-title-edit "
              type="text"
              name="title"
              onChange={inputHandler}
              value={groupTitle}
              ref={titleRef}
            />
          )}
        </div>
        <span className="person">Person</span>
        <span className="status">Status</span>
        <span className="date">Date</span>
      </div>
      <TaskList
        board={board}
        onEditBoard={onEditBoard}
        group={group}
        tasks={group.tasks}
        onOpenUpdates={onOpenUpdates}
      />
    </div>
  );
};
