import { BoardNavigationList } from "./BoardNavigationList";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import HomeIcon from "@material-ui/icons/Home";
import { useEffect, useState } from "react";
import { Popper } from "../../../shared";
import { right } from "@popperjs/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export const BoardSideBar = ({ boards, toggleModal, setFilter }) => {
  const [filteredBoards, setFilteredBoards] = useState(boards);

  const [typeFilter, setTypeFilter] = useState({
    "Employees": false,
    "Campaigns": false,
    "Projects": false,
    "Creatives": false,
    "Clients": false,
    "Tasks": false,
  });


  const handleChange = (event) => {
    setTypeFilter({
      ...typeFilter,
      [event.target.name]: event.target.checked,
    });
  };
  useEffect(() => {
    var filter;
    Object.entries(typeFilter).forEach(([key, value]) => {
      if (!filter) filter = []
      if (value)
        filter.push(key)
    })
    setFilter(filter)
  }, [typeFilter,setFilter])

  useEffect(() => {
    setFilteredBoards(boards);
  }, [boards]);

  const [inputVal, setInputVal] = useState("");
  const inputHandler = (ev) => {
    setInputVal(ev.target.value);
    const regex = new RegExp(ev.target.value, "i");
    setFilteredBoards(boards.filter((board) => regex.test(board.title)));
  };


  return (
    <section className="side-bar-container flex column">
      <div className="workspace-title flex row align-center">
        <span className="letter flex">
          <span>M</span>
          <HomeIcon />
        </span>
        <span>Main workspace</span>
      </div>
      <div className="btns-container ">
        <button
          className="flex align-center side-bar-btns-width"
          onClick={toggleModal}
        >
          <AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon> Add
        </button>
        <Popper
          button={
            <button className="flex align-center side-bar-btns-width">
              <AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon>
              Filters
            </button>
          }
          popper={
            <div
              className="flex column"
              style={{ border: "2px solid black", backgroundColor: "white" ,padding:'5px'}}
            >
              <FormGroup>
                {Object.entries(typeFilter).map(([typeName, typeValue], idx) => {
                  return <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        checked={typeValue}
                        onChange={handleChange}
                        name={typeName}
                      />
                    }
                    label={typeName}
                  />
                }
                )}
              </FormGroup>
            </div>
          }
          y={42}
          disappearOnPopperClick={false}
          placementChange={right}
        ></Popper>
        <div className="flex side-bar-btns-width">
          <SearchOutlinedIcon></SearchOutlinedIcon>
          <input
            placeholder="Search boards..."
            type="text"
            onChange={inputHandler}
            value={inputVal}
          />
        </div>
      </div>

      {boards && <BoardNavigationList
        boards={filteredBoards}
        msg={
          boards.length > 0 && filteredBoards.length === 0 && "No results found"
        }
      ></BoardNavigationList>}
    </section>
  );
};
