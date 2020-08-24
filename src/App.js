import React, { Component, useState, useEffect, useContext } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import SearchBar from "./components/SearchBar";
import Sortbutton from "./components/Sortbutton";
import API from "./utils/API";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState("");
  const searchAPI = () => {
    API.getUsers().then((res) => {
      setData(res.data.results);
    });
  };

  useEffect(() => {
    searchAPI();
  }, []);

  const filteredEmployees = data.filter((element) => {
    return (
      `${element.name.first}+${element.name.last}`
        .toUpperCase()
        .indexOf(search.toUpperCase()) !== -1
    );
  });

  const searchBar = (element) => setSearch(element.target.value);

  function dynamicSort(property) {
    console.log(property);
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      console.log(a[property]);
      console.log(b[property]);
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  }

  const sortByName = () => {
    const newData = data.sort((a, b) => {
      if (a.name.first > b.name.first) {
        return 1;
      } else {
        return -1;
      }
    });

    console.log(newData);
    setData(newData);
    setRefresh({ refresh: "" });
  };

  const sortByEmail = () => {
    const newData = data.sort(dynamicSort("email"));
    setData(newData);
    console.log(data);
    setRefresh({ refresh: "" });
  };

  const sortByPhone = () => {
    const newData = data.sort(dynamicSort("phone"));
    setData(newData);
    console.log(data);
    setRefresh({ refresh: "" });
  };

  return (
    <Wrapper>
      <SearchBar searchBar={searchBar} />

      <h1 className="title">Employee List</h1>
      <table>
        <thead>
          <tr>
            <th onClick={sortByName}>Name</th>
            <th onClick={sortByEmail}>Email</th>
            <th onClick={sortByPhone}>Phone</th>
            <th>dob</th>
          </tr>
        </thead>
        {filteredEmployees.map((item) => {
          return (
            <Card
              name={item.name.first + " " + item.name.last}
              dob={item.dob.date}
              phone={item.phone}
              email={item.email}
            />
          );
        })}
      </table>
    </Wrapper>
  );
}

export default App;
