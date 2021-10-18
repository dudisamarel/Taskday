import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

export const SmallSearchField = () => {
  return (
    <div className="search-field">
      <SearchOutlinedIcon />
      <input
        id="standard-basic"
        label="Search"
        name="txt"
        autoComplete="off"
        placeholder="Search"
      />
    </div>
  );
};
