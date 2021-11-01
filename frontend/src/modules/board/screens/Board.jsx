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
import emptypage from "../../../assets/imgs/emptypage.png";
import { userService } from "../../user/service/userService";
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
  const [sidebarToggler, setSidebarToggler] = useState(true);


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
    boardService.query(filter).then((res) => {
      dispatch(loadBoards(res))
    });
  }, [filter, dispatch])

  useEffect(() => {
    if (!loading) {
      boardService.query().then((res) => {
        dispatch(loadBoards(res));
        setTimeout(() => setLoading(true), 2000)
      }).catch(err => toasting(0, err))
    }
  }, [dispatch, loading])


  useEffect(() => {
    let boardId = match.params.boardId;
    if (!boards || boards?.length === 0) return
    if (currBoard && currBoard._id === boardId) return
    if (boardId) {
      boardService.getById(boardId).then(board => {
        dispatch(loadBoard(board));
      }).catch(err => {
        toasting(0, err)
      });
    }
    else {
      if (!currBoard)
        dispatch(loadBoard(boards[0]));
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
      <div className="board-layout flex">

        <PopUpModal
          toggle={!toggleUpdates}
          toggleModal={(ev) => {
            ev.stopPropagation()
            setToggleUpdates(false)
          }}
        >
          <CSSTransition
            in={toggleUpdates}
            timeout={500}
            classNames="comments-wrapper"
            unmountOnExit
            onEnter={() => setToggleUpdates(true)}
            onExited={() => setToggleUpdates(false)}
          >
            <TaskUpdates
              inAnim={toggleUpdates}
              user={user}
              task={task}
              onEditBoard={onEditBoard}
              close={() => setToggleUpdates(false)}
            />
          </CSSTransition>
        </PopUpModal>

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

        <div className={"half-circle" + (!sidebarToggler ? " closed" : ' opened')}
          onClick={() => {
            setSidebarToggler(!sidebarToggler)
          }}
        >  <i
            className={"arrow " + (!sidebarToggler ? "right" : 'left')} />
        </div>

        <CSSTransition
          in={sidebarToggler}
          appear={true}
          timeout={500}
          classNames="sidebar-container"
          unmountOnExit
          onEnter={() => setSidebarToggler(true)}
          onExited={() => setSidebarToggler(false)}
        >
          <BoardSideBar
            toggleModal={toggleModal}
            boards={boards} setFilter={setFilter}
            userfullname={user.fullname}
          />
        </CSSTransition>


        {(boards && boards.length > 0 ? (
          <div className="board-container-wrapper">
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

            </div>
          </div>
        ) : (
          <div className="emptypage-img-container">
            <img src={emptypage} alt="icon"></img>
          </div>
        ))}
      </div >

    ) : <div className="flex align-center justify-center" style={{ height: '100%' }}>
      <RotateLoader color={'#0398fc'} size={30} margin={40}></RotateLoader>
    </div>}
  </Fragment >
};
