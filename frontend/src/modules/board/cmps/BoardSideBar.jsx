import { BoardNavigationList } from "./BoardNavigationList";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { Popper } from "../../../shared";
import { right } from "@popperjs/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { userService } from "../../user/service/userService";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const BoardSideBar = ({ boards, toggleModal, setFilter, userfullname }) => {
  const [filteredBoards, setFilteredBoards] = useState(boards);

  const [typeFilter, setTypeFilter] = useState({
    "Employees": false,
    "Campaigns": false,
    "Projects": false,
    "Creatives": false,
    "Clients": false,
    "Tasks": false,
  });

  const [searchToggler, setSearchToggler] = useState(false)
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
  }, [typeFilter, setFilter])

  useEffect(() => {
    setFilteredBoards(boards);
  }, [boards]);

  const [inputVal, setInputVal] = useState("");
  const inputHandler = (ev) => {
    setInputVal(ev.target.value);

  };
  useEffect(() => {
    const regex = new RegExp(inputVal, "i");
    setFilteredBoards(boards.filter((board) => regex.test(board.title)));
  }, [inputVal, boards])

  const doLogout = () => {
    userService
      .logout()
      .then(() => {
        window.location.assign(
          '/sign'
        )
      })
  };



  return (
    <section className="flex column sidebar-container">
      <div className="top-section">
        <div className="username-container flex justify-space-between">
          <span >{userfullname} </span>
          <button onClick={doLogout} >
            <LogoutIcon />
          </button>
        </div>
        <div className="tools-container">
          <button
            className="flex align-center"
            onClick={toggleModal}
          >
            <AddCircleOutlineOutlinedIcon style={{ marginInlineEnd: '4px' }} /> Add
          </button>
          <Popper
            button={
              <button className="flex align-center ">
                <FilterAltOutlinedIcon style={{ marginInlineEnd: '2px' }} />
                Filters
              </button>
            }
            popper={
              <div
                className="flex column"
                style={{ border: "2px solid black", backgroundColor: "white", padding: '5px' }}
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
          <div className="flex align-center" >
            {searchToggler ? <Input
              className="search"
              label="Search"
              type="text"
              onChange={inputHandler}
              value={inputVal}
              endAdornment={<button onClick={() => {
                setSearchToggler(false)
                setInputVal('')
              }}><CloseIcon /></button>}

            /> : <button className="flex align-center" onClick={() => { setSearchToggler(true) }}>
              <SearchOutlinedIcon /> Search
            </button>
            }
          </div>
        </div>
      </div>

      <div className="spacer" />

      {boards && <BoardNavigationList
        boards={filteredBoards}
        msg={
          boards.length > 0 && filteredBoards.length === 0 && "No results found"
        }
      ></BoardNavigationList>}
    </section>
  );
};
