import React, { useCallback, useEffect, useState } from "react";
// components
import Month from "./components/Month";
import UserList from "./components/UserList";
//services
import { getUsers } from "./services/api";
// styles
import "./App.scss";

const months = [
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
        const _usersByMonth = new Array(months.length).fill([]);

        _usersByMonth.forEach((_, index) => {
          _usersByMonth[index] = data.filter(
            (user) => new Date(user.dob).getMonth() === index
          );
        });

        setUsersByMonth(_usersByMonth);
      })
      .catch((error) => {
        alert(`Cannot access data. Error: ${error}`);
      });
  }, []);

  const handleMonthEnter = useCallback((month) => {
    setActiveMonth(months.indexOf(month));
  }, []);

  const clearList = useCallback(() => {
    setActiveMonth(null);
  }, []);

  return (
    <div className="app">
      <div className="months">
        {months.map((month, index) => (
          <Month
            month={month}
            key={index}
            length={usersByMonth[index]?.length ?? 0}
            onMouseLeave={clearList}
            onMouseEnter={handleMonthEnter}
          />
        ))}
      </div>
      <div className="user-list">
        {activeMonth !== null && usersByMonth.length !== 0 && (
          <UserList users={usersByMonth[activeMonth]} />
        )}
      </div>
    </div>
  );
};

export default App;
