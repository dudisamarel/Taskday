import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
export const MainNavDownLogos = () => {
  return (
    <section className="main-nav-down-logo-wrapper flex column">
      <AssignmentTurnedInIcon className="my-week" />
      <PersonAddIcon className="invite-members"/>
      <SearchIcon className="search"/>
    </section>
  );
};
