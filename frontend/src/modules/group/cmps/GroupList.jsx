import { DragDropContext } from "react-beautiful-dnd";
import { GroupPreview } from "./GroupPreview";

export const GroupList = ({ groups, board, onEditBoard, onOpenUpdates, toggleUpdates }) => {
  const onDragEndHandler = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startTasks = groups.find(
      (group) => group._id === source.droppableId
    ).tasks;
    const finishTasks = groups.find(
      (group) => group._id === destination.droppableId
    ).tasks;
    const [task] = startTasks.splice(source.index, 1);
    if (destination.droppableId === source.droppableId) {
      startTasks.splice(destination.index, 0, task);
      onEditBoard();
    } else {
      finishTasks.splice(destination.index, 0, task);
      onEditBoard();
    }
  };
  var width = toggleUpdates ? '60% ' : '100%';
  return (
    <section className="group-list-wrapper" style={{ maxWidth: width }}>
      <DragDropContext onDragEnd={onDragEndHandler}>
        {groups &&
          groups.map((group) => {
            return (
              <GroupPreview
                onEditBoard={onEditBoard}
                key={group._id}
                board={board}
                group={group}
                onOpenUpdates={onOpenUpdates}
              ></GroupPreview>
            );
          })}
      </DragDropContext>
    </section>
  );
};
