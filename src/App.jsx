import React from "react";
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

class App extends React.Component {
  state = {
    activeMonth: null,
    usersByMonth: [],
  };

  componentDidMount() {
    getUsers()
      .then((response) => {
        let tempNumUsersArray = [];
        for (let i = 0; i < months.length; i++) {
          tempNumUsersArray.push(
            response.data.filter((user) => new Date(user.dob).getMonth() === i)
          );
        }
        this.setState({
          usersByMonth: [...tempNumUsersArray],
        });
      })
      .catch((error) => {
        alert(`Cannot access data. Error: ${error}`);
      });
  }

  handleMonthEnter = (month) => {
    this.setState({
      activeMonth: months.indexOf(month),
    });
  };

  clearList = () => {
    this.setState({
      activeMonth: null,
    });
  };

  render() {
    return (
      <div className="app">
        <div className="months">
          {months.map((month, index) => (
            <Month
              month={month}
              key={index}
              length={
                this.state.usersByMonth[index]
                  ? this.state.usersByMonth[index].length
                  : 0
              }
              onMouseLeave={this.clearList}
              onMouseEnter={this.handleMonthEnter}
            />
          ))}
        </div>
        <div className="user-list">
          {this.state.activeMonth !== null && (
            <UserList users={this.state.usersByMonth[this.state.activeMonth]} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
