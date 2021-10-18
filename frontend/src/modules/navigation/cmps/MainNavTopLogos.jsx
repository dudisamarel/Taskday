import BorderAllOutlinedIcon from "@material-ui/icons/BorderAllOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import sundayIcon from "../../../assets/imgs/sundayIcon.svg"

import InboxIcon from "@material-ui/icons/Inbox";
export const MainNavTopLogos = () => {
  return (
    <section className="main-nav-top-logo-container flex column align-center">
      <img className="logo" src={sundayIcon} alt="" />
      <BorderAllOutlinedIcon className="option" />
      <NotificationsNoneOutlinedIcon className="notification" />
      <InboxIcon className="inbox" />
    </section>
  );
};
