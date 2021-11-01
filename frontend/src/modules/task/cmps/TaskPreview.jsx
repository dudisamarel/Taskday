import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForever from "@material-ui/icons/DeleteForever";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Status } from "./Status";
import { Popper } from "../../../shared";
import { forwardRef, useEffect, useRef, useState } from "react";
import { bottom } from "@popperjs/core";
import { useClickOutside } from "../../../shared/hooks/clickOutSide";
export const TaskPreview = ({
  task,
  onRemoveTask,
  onEditBoard,
  onOpenUpdates,
}) => {

  const inputHandler = (ev) => {
    setTempTitle(ev.target.value);
  };

  const onChangeTitle = () => {
    if (task.title !== tempTitle) {
      task.title = tempTitle;
      onEditBoard();
    }
    setChangeTitleToggler(false)
  }
  const [changeTitleToggler, setChangeTitleToggler] = useState(false);
  const titleRef = useRef(null);
  const [tempTitle, setTempTitle] = useState(task.title)
  useEffect(() => {
    if (titleRef.current)
      titleRef.current.focus()
  }, [changeTitleToggler])

  const onEditStatus = (text, color) => {
    if (task.status.text === text && task.status.color === color) return;
    task.status = { text, color };
    onEditBoard();
  };

  const parsedDate = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(task.endDate)
    return `${monthNames[date.getUTCMonth()].slice(0, 3)}  ${date.getUTCDate()}`
  }

  const changeTitleDom = useClickOutside(() => {
    if (changeTitleToggler === true)
      setChangeTitleToggler(false)
    if (tempTitle !== task.title)
      setTempTitle(task.title)
  })

  const onEditDate = (date) => {
    task.endDate = date
    onEditBoard()
  }

  const ExampleCustomInput = forwardRef(({ onClick }, ref) => (
    <div className="flex justify-center align-center" onClick={onClick} ref={ref}>
      <span>
        {parsedDate()}
      </span>
    </div>
  ));
  return (
    <div>
      <div className="task-grid ">
        <div className="grid-element flex align-center options-container">
          <Popper
            button={<SettingsOutlinedIcon />}
            popper={
              <div className="flex column edit-menu">
                <button onClick={() => onRemoveTask(task._id)}><DeleteForever /> Delete</button>
                <button onClick={() => setChangeTitleToggler(true)}><EditIcon /> Rename</button>
              </div>
            }
          />
        </div>
        <div className="flex justify-space-between grid-element align-center task-title ">
          {changeTitleToggler ? <div className="flex change-title " ref={changeTitleDom}
          >
            <input
              onChange={inputHandler}
              ref={titleRef}
              value={tempTitle}
            />
            <DoneOutlineIcon color="primary" onClick={onChangeTitle} />
          </div>
            : <div className="ellipsis ">
              <span >{task.title}</span>
            </div>

          }
          <div
            className="flex align-center justify-center"
            onClick={() => onOpenUpdates(task)}
          >
            <ChatBubbleOutlineRoundedIcon />
          </div>
        </div>
        <button className="grid-element  ">
          <AccountCircleIcon />
        </button>

        <div className="grid-element ">
          <Popper
            y={-3}
            button={
              <div
                style={{ backgroundColor: task.status.color, color: "#ffffff" }}
                className="main-status flex justify-center aling-center"
              >
                <span>{task.status.text}</span>
              </div>
            }
            popper={
              <div className="chnage-status-container flex column align-center ">
                <Status onEditStatus={onEditStatus} type={"Done"} clr={"#33d391"}>
                  Done
                </Status>
                <Status
                  onEditStatus={onEditStatus}
                  type={"Working on it"}
                  clr={"#fec06e"}
                >
                  Working on it!
                </Status>
                <Status
                  onEditStatus={onEditStatus}
                  type={"Stuck"}
                  clr={"#e2445c"}
                >
                  Stuck
                </Status>
                <Status
                  onEditStatus={onEditStatus}
                  type={"Not status yet"}
                  clr={"#c4c4c4"}
                >
                  Not status yet
                </Status>
              </div>
            }
          />
        </div>
        <div className="grid-element ">

          <DatePicker popperModifiers={[
            {
              name: "offset",
              options: {
                offset: [-20, -5],
                padding: 0
              },
            }
          ]}
            popperPlacement={bottom}
            selected={new Date(task.endDate)}
            onChange={(date) => onEditDate(date)}
            customInput={<ExampleCustomInput />}
          />

        </div>
        <div className="grid-element">

        </div>
      </div>
    </div>
  );
};
