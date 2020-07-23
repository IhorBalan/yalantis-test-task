import React from 'react';
import logo from './logo.svg';
import Month from "./components/Month";
import Description from "./components/Description";
import './scss/App.scss';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const axios = require('axios').default;

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          users: [],
          showUsers: []
      }
  }

  componentDidMount() {
      axios.get('https://yalantis-react-school-api.yalantis.com/api/task0/users')
          .then(response => {
              this.setState({
                  users: response.data
              })
          })
          .catch(error => {
              console.log(error);
          })
  }

  handleHover = (month = '') => {
      if (months.indexOf(month) === -1){
          this.setState({
              showUsers: []
          })
          return;
      }
    this.setState({
        showUsers: this.state.users.filter(user => new Date(user.dob).getMonth() === months.indexOf(month))
    });
  }

    render(){
      return <div className="App">
          <div className="Months">
              {months.map((month, index) =>
                  <Month month={month} key={index} index={months.indexOf(month)} users={this.state.users} handleHover={this.handleHover} />
              )}
          </div>
          <div>
              <Description users={this.state.showUsers} />
          </div>
      </div>;
  }
}

export default App;
