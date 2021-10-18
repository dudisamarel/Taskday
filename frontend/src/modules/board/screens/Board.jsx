import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BoardPreview } from "../cmps/BoardPreview";
import { BoardSideBar } from "../cmps/BoardSideBar";
import { PopUpModal } from "../../../shared/cmps/PopUpModal";
import { BoardAdd } from "../cmps/BoardAdd";
import { makeStyles } from "@material-ui/core";
import { BoardHeader } from "../cmps/BoardHeader";
import { boardService } from "../service/boardService";
import { CSSTransition } from 'react-transition-group';
import { RotateLoader } from "react-spinners";
import {
  addBoard,
  editBoard,
  loadBoard,
  loadBoards,
} from "../../../store/actions/boardActions";
import { TaskUpdates } from "../../task/cmps/TaskUpdates";
import { MainNav } from "../../index";
import emptypage from "../../../assets/imgs/emptypage.png";
import { userService } from "../../user/service/userService";
import { utilService } from "../../../shared";
import { addActivity } from "../../../shared/services/activityService";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from "react";
import toasting from "../../../shared/services/toasting";

export const Board = ({ match }) => {
  const [modal, setModal] = useState(false);
  const { currBoard, boards } = useSelector((state) => state.boardModule);
  const dispatch = useDispatch();
  const [toggleUpdates, setToggleUpdates] = useState(false);
  const [task, setTask] = useState();
  const [filter, setFilter] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    userService.getLoggedinUser().then((user) => {
      setUser(user)
      if (!user)
        window.location.assign(
          '/sign'
        )
    })
  }, [])

  useEffect(() => {
    if (!loading) {
      boardService.query(filter).then((res) => {
        dispatch(loadBoards(res));
        setTimeout(() => setLoading(true), 2000)
      }).catch(err => toasting(0, err))
    }
  }, [filter, dispatch, loading])


  useEffect(() => {
    if (boards && boards.length !== 0) {
      let boardId = match.params.boardId;
      if (boardId && (!currBoard || boardId !== currBoard._id)) {
        boardService.getById(boardId).then(board => {
          dispatch(loadBoard(board));
        }).catch(err => {
          toasting(0, err)
        });
      } else if (!currBoard) {
        dispatch(loadBoard(boards[0]));
      }
    }
  }, [boards, match.params, dispatch, currBoard]);



  const toggleModal = (ev) => {
    ev.stopPropagation();
    setModal(!modal);
  };

  //Modal Generic CSS
  const useStyles = makeStyles({
    popup: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: '11'
    },
  });
  const classes = useStyles();

  //Adding new Board
  const onAddBoard = async (board, ev) => {
    ev.stopPropagation();
    boardService.save(board).then((res) => {
      if (!res) toasting(0, "Some errors occurred")
      dispatch(addBoard(res));
      toggleModal(ev);
      toasting(1, "Added board successfully")
    }).catch(() => toasting(0, "Some errors occurred"))
  }
  const onEditBoard = async (action = null) => {
    // UPDATING THE BOARD (SERVER + STORE)
    if (action) addActivity(action, currBoard, user)
    boardService.edit(currBoard).then((res) => {
      dispatch(editBoard(res));
    }).catch(err => console.log(err))
  };
  const onOpenUpdates = (task) => {
    setTask(task);
    setToggleUpdates(true);
  };
  // var className;
  // toggleUpdates? className="50%" : className="100%";

  return <Fragment>

    <ToastContainer
      limit={3}
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    {loading ? (
      <div>
        <div className="board-layout flex">

          {/* Add Board Popup */}

          <PopUpModal
            toggle={!modal}
            toggleModal={toggleModal}
            popup={classes.popup}
            isDark
          >
            <CSSTransition
              in={modal}
              timeout={300}
              classNames="add-board-container"
              unmountOnExit
              onEnter={() => setModal(true)}
              onExited={() => setModal(false)}
            >
              <BoardAdd
                types={[
                  "Employees",
                  "Campaigns",
                  "Projects",
                  "Creatives",
                  "Clients",
                  "Tasks",
                ]}
                onAdd={onAddBoard}
                toggleModal={toggleModal}
              />
            </CSSTransition>
          </PopUpModal>


          <MainNav />


          <BoardSideBar toggleModal={toggleModal} boards={boards} setFilter={setFilter}></BoardSideBar>
          {(boards && boards.length > 0 ? (
            <div className="flex">
              <div className="board-container flex column ">
                <BoardHeader
                  board={currBoard}
                  onEditBoard={onEditBoard}
                ></BoardHeader>
                {currBoard ? (
                  <BoardPreview
                    onEditBoard={onEditBoard}
                    board={currBoard}
                    groups={currBoard.groups}
                    onOpenUpdates={onOpenUpdates}
                    toggleUpdates={toggleUpdates}
                  />
                ) : <h1>Not found</h1>}
                {toggleUpdates && (
                  <TaskUpdates
                    task={task}
                    onEditBoard={onEditBoard}
                    close={() => setToggleUpdates(false)}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="emptypage-logo-wrapper">
              <div className="emptypage-img-container">
                <img src={emptypage} alt="icon"></img>
              </div>
            </div>
          ))}
        </div >

      </div>
    ) : <div className="flex align-center justify-center" style={{ height: '100vh' }}>
      <RotateLoader color={'#0398fc'} size={30} margin={40}></RotateLoader>
    </div>}
  </Fragment>
};
