import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import { useHistory, useParams } from "react-router";
import { useState } from "react";

export const BoardNavigationPreview = ({ board, onRemoveBoard, boards }) => {
  let { boardId } = useParams();
  const history = useHistory();
  if (!boardId) boardId = boards[0]._id;
  const [RemoveIcon, setRemoveIcon] = useState(<DeleteOutlineIcon />);
  //added class for scss
  let className = "";
  let spanAndIconClassName = ""
  if (boardId === board._id) {
    className += " active";
    spanAndIconClassName += " span-active";
  }

  return (
    <section className={"side-boardlist-preview-container flex align-center justify-space-between" + className}>
      <Link
        className={
          spanAndIconClassName
        }
        to={`/board/${board._id}`}
      >
        <span className={spanAndIconClassName}>
          { board.title}
        </span>
        </Link >
      <div
        className={"delete-btn " + spanAndIconClassName}
        onMouseEnter={() => setRemoveIcon(<DeleteForeverIcon />)}
        onMouseLeave={() => setRemoveIcon(<DeleteOutlineIcon />)}
        onClick={() => {
          onRemoveBoard(board._id).then(() => {
            history.push("/board");
          }).catch(err => console.log(err));
        }}
        >
        {RemoveIcon}
      </div>
    </section >
  );
};
