import React, { useEffect, useState } from "react";
// components
import Month from "./components/Month";
import UserList from "./components/UserList";
//services
import { getUsers } from "./services/api";
// styles
import "./App.scss";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const App = () => {
  const [activeMonth, setActiveMonth] = useState(null);
  const [usersByMonth, setUsersByMonth] = useState([]);

  useEffect(() => {
    getUsers()
      .then(({ data }) => {
        let tempNumUsersArray = [];
        for (let i = 0; i < MONTHS.length; i++) {
          tempNumUsersArray.push(
            data.filter((user) => new Date(user.dob).getMonth() === i)
          );
        }
        setUsersByMonth(tempNumUsersArray);
      })
      .catch((error) => {
        alert(`Cannot access data. Error: ${error}`);
      });
  });

  const handleMonthEnter = (month) => {
    setActiveMonth(MONTHS.indexOf(month));
  };

  const clearList = () => {
    setActiveMonth(null);
  };

  return (
    <div className="app">
      <div className="months">
        {MONTHS.map((month, index) => (
          <Month
            month={month}
            key={index}
            length={usersByMonth[index] ? usersByMonth[index].length : 0}
            onMouseLeave={clearList}
            onMouseEnter={handleMonthEnter}
          />
        ))}
      </div>
      <div className="user-list">
        {activeMonth !== null && <UserList users={usersByMonth[activeMonth]} />}
      </div>
    </div>
  );
};

export default App;
