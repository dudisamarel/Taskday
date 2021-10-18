import { types } from "../reducers/boardReducer";

export const loadBoards = (payload) => ({
  type: types.SET_BOARDS,
  payload,
});
export const loadBoard = (payload) => ({
  type: types.SET_BOARD,
  payload,
});
export const addBoard = (payload) => ({
  type: types.ADD_BOARD,
  payload,
});
export const removeBoard = (payload) => ({
  type: types.REMOVE_BOARD,
  payload,
});
export const editBoard = (payload) => ({
  type: types.EDIT_BOARD,
  payload,
});
