import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import { useHistory, useParams } from "react-router";
import { useState } from "react";

export const BoardNavigationPreview = ({ board, onRemoveBoard, boards }) => {
  const history = useHistory();
  let { boardId } = useParams();
  if (!boardId) boardId = boards[0]._id;
  const [RemoveIcon, setRemoveIcon] = useState(<DeleteOutlineIcon />);
  //added class for scss
  let className = "flex justify-space-between align-center side-bar-btns-width";
  let spanAndIconClassName = "",
    disableLink = "";
  if (boardId === board._id) {
    className += " active";
    spanAndIconClassName += " span-active";
    disableLink += " disable-link";
  }

  return (
    <section className={"board-list-navigate-preview-wrapper " + className}>
      <Link
        className={
          "link flex align-center" + spanAndIconClassName + disableLink
        }
        to={`/board/${board._id}`}
      >
        <DashboardOutlinedIcon></DashboardOutlinedIcon>
        <span className={spanAndIconClassName}>
          {board.title.length > 15
            ? board.title.slice(0, 15) + "..."
            : board.title}
        </span>
      </Link>
      <div
        onMouseEnter={() => setRemoveIcon(<DeleteForeverIcon />)}
        onMouseLeave={() => setRemoveIcon(<DeleteOutlineIcon />)}
        className={"options-btn " + spanAndIconClassName}
        onClick={() => {
          onRemoveBoard(board._id).then(() => history.push("/board"));
        }}
      >
        {RemoveIcon}
      </div>
    </section>
  );
};
