import { removeBoard } from "../../../store/actions/boardActions";
import { boardService } from "../service/boardService";
import { useDispatch } from "react-redux";
import { BoardNavigationPreview } from "./BoardNavigationPreview";
import toasting from "../../../shared/services/toasting";

export const BoardNavigationList = ({ boards, msg }) => {
  const dispatch = useDispatch();

  const onRemoveBoard = async (boardId) => {
    try {
      const res = await boardService.remove(boardId); // return id of deleted
      dispatch(removeBoard(res));
      toasting(1, "Removed board successfully")
    } catch (err) {
      toasting(0, err, 2000)
    }
  }

  return (
    <div className="board-list-navigate-wrapper">
      <div className="spacer"></div>


      {boards && (
        <div className="board-list-container flex column align-start ">
          {boards.map((board) => {
            return (
              <BoardNavigationPreview
                key={board._id}
                board={board}
                boards={boards}
                onRemoveBoard={onRemoveBoard}
              ></BoardNavigationPreview>
            );
          })}
        </div>
      )}
      {boards.length === 0 &&
        (msg ? (
          <span>{msg}</span>
        ) : (
          <div className="flex column" style={{ padding: "10px" }}>
            <span>Workspace is empty</span>
            <span>Create or add boards</span>
          </div>
        ))}
    </div>
  );
}
