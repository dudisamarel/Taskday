import { TextField } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { boardService } from "../../modules/board/service/boardService";
import { userService } from "../../modules/user/service/userService";
import { editBoard, loadBoard } from "../../store/actions/boardActions";

export const InviteUsers = ({ board }) => {
  const [usernames, setUsernames] = useState(null);
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch()


  useEffect(() => {
    const getUsernames = async () => {
      try {
        let users = await userService.getUsernames(filter);
        users = users.filter((user) => !board.members.includes(user._id) && user._id !== board.ownedBy);
        setUsernames(users);
      } catch { }
    };
    getUsernames();
  }, [filter,board.ownedBy,board.members]);


  const onInvite = (userId) => {
    boardService.addMember(board, userId).then((res) => {
      dispatch(editBoard(res));
      dispatch(loadBoard(res));
    })
  }


  const inputHandler = (ev) => {
    setFilter(ev.target.value);
  };

  return (

    <div className="user-list-container">
      <TextField
        label="Username"
        InputProps={{
          startAdornment: (
            <AccountCircle style={{ marginRight: '2px' }} />
          ),
        }}
        onClick={(ev) => ev.stopPropagation()}
        onChange={inputHandler}
      />
      <div className="flex column align-center user-list" >
        {(usernames && usernames.length > 0) ?
          usernames.map((user) => {
            return <button key={user._id} onClick={() => onInvite(user._id)}>{user.username}</button>;
          }) : <span>No users to invite</span>}
      </div>
    </div>
  );
};
