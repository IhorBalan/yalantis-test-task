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
    showUsers: [],
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
      showUsers: this.state.usersByMonth[months.indexOf(month)],
    });
  };

  clearList = () => {
    this.setState({
      showUsers: [],
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
          <UserList users={this.state.showUsers} />
        </div>
      </div>
    );
  }
}

export default App;
