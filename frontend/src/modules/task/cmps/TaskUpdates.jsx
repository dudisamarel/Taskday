import RichTextEditor from "../../../shared/cmps/RichTextEditor";
import { utilService } from "../../../shared/services/utilService";
import { TaskComments } from "./TaskComments";

export const TaskUpdates = ({ task, onEditBoard, close, user, inAnim }) => {
  const onAddComment = (comment) => {
    task.comments.unshift({ text: comment, _id: utilService.makeId(), user });
    console.log(user);
    onEditBoard();
  };
  const onDeleteComment = (id) => {
    task.comments = task.comments.filter((c) => c._id !== id);
    onEditBoard();
  };


  return (
    <div
      className="comments-wrapper flex column align-center"
    >
      <div>
        <button className="x" onClick={close}>
          x
        </button>
        <div className="ellipsis header">
          <span>{task.title}</span>
        </div>
      </div>
      <div className="rich-text-editor-wrapper flex column">


        <RichTextEditor onAddComment={onAddComment} />
      </div>
      {
        task.comments.length === 0 ? (
          <span className="align-self-center">No updates yet...</span>
        ) : (
          task.comments.map((task) => (
            <TaskComments task={task} onDeleteComment={onDeleteComment} />
          ))
        )
      }
    </div >
  );
};
