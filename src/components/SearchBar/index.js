import React, { useState } from "react";

const SearchBar = (props) => {
  const [search, setSearch] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };
  return (
    <div className="SearchDiv">
      <input
        placeholder="Search an employee"
        className="SearchInput"
        onChange={props.searchBar}
      />
    </div>
  );
};
export default SearchBar;
