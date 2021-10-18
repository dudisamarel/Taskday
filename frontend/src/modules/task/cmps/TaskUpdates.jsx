import {  makeStyles } from "@material-ui/core";
import { useState } from "react";
import RichTextEditor from "../../../shared/cmps/RichTextEditor";
import { utilService } from "../../../shared/services/utilService";
import { TaskComments } from "./TaskComments";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

export const TaskUpdates = ({ task, onEditBoard, close }) => {
  const [isSwitchReachInputField, setIsSwitchReachInputField] = useState(false);
  const onAddComment = (comment) => {
    task.comments.unshift({ text: comment, _id: utilService.makeId() });
    onEditBoard();
  };
  const onDeleteComment = (id) => {
    task.comments = task.comments.filter((c) => c._id !== id);
    onEditBoard();
  };
  const switchReachTextField = () => {
    setTimeout(() => {
      setIsSwitchReachInputField(!isSwitchReachInputField);
    }, 500);
    
  };
  const useStyles = makeStyles({
    style: {
      position: "absolute",
      right: "0%",
      top: "0%",
      backgroundColor: "#fff",
      width: "45vw",
      zIndex: '2'
    },
  });
  const classes = useStyles();
  return (
    <div
      className={"comments-wrapper flex column " + classes.style}
      style={{ height: "100vh", overflowY: "scroll"}}
    >
      <div className="flex column align-start">
        <button className="x" onClick={close}>
          x
        </button>
        <h2>{task.title}</h2>
      </div>
      <div className="rich-text-editor-wrapper flex column">
        {!isSwitchReachInputField && (
          <div className="search-field" style={{margin:'0 auto'}}>
            <SearchOutlinedIcon />
            <input
            style={{width:'300px'}}
              onClick={switchReachTextField}
              id="standard-basic"
              label="Search"
              name="txt"
              autoComplete="off"
              placeholder="Search"
              autoFocus="on"
            />
          </div>
        )}
        {isSwitchReachInputField && (
          <RichTextEditor switchReachTextField={switchReachTextField} onAddComment={onAddComment} />
        )}
      </div>
      {task.comments.length === 0 ? (
        <span className="align-self-center">No updates yet...</span>
      ) : (
        task.comments.map((task) => (
          <TaskComments task={task} onDeleteComment={onDeleteComment} />
        ))
      )}
    </div>
  );
};
