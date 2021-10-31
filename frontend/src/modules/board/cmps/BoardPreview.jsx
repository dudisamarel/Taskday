import React from "react";
import { GroupList } from "../../group";

export const BoardPreview = ({ groups, board, onEditBoard, onOpenUpdates , toggleUpdates }) => {
  return (
      <GroupList
        board={board}
        onOpenUpdates={onOpenUpdates}
        onEditBoard={onEditBoard}
        groups={groups}
        toggleUpdates = {toggleUpdates}
      />
  );
};
