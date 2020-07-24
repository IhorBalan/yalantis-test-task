import React from "react";
import { getUsers } from "./services/api";
import Month from "./components/Month";
import UserList from "./components/UserList";
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
    users: [],
    showUsers: [],
    numUsersByMonth: [],
  };

  componentDidMount() {
    getUsers()
      .then((response) => {
        let tempNumUsersArray = [];
        for (let i = 0; i < months.length; i++) {
          tempNumUsersArray.push(
            response.data.filter((user) => new Date(user.dob).getMonth() === i)
              .length
          );
        }
        this.setState({
          users: response.data,
          numUsersByMonth: [...tempNumUsersArray],
        });
      })
      .catch((error) => {
        alert(`Cannot access data. Error: ${error}`);
      });
  }

  handleMonthEnter = (month) => {
    this.setState({
      showUsers: this.state.users.filter(
        (user) => new Date(user.dob).getMonth() === months.indexOf(month)
      ),
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
              length={this.state.numUsersByMonth[index]}
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
