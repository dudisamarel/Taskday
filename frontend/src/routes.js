import { Board } from "./modules/board";
import { LoginSignup } from "./modules/user/cmps/LoginSignup";
// import { LoginSignup } from "./modules/user/cmps/LoginSignup";

export const routes = [
  {
    exact: true,
    path: "/",
    component: Board,
  },
  {
    exact: true,
    path: ['/board', '/board/:boardId'],
    component: Board,
  },
  {
    exact: true,
    path: "/sign",
    component: LoginSignup
  },
  {
    //NEEDS TO BE NOT FOUND
    component: LoginSignup
  }

];
