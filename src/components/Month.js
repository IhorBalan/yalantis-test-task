import React from "react";
import '../scss/Month.scss'

class Month extends React.Component{

    componentDidMount() {
        console.log(this.props.users)
    }

    handleMouse = (month = '') =>{
        this.props.handleHover(month);
    }

    getClassName = () => {
        let length = this.props.users.filter(user => new Date(user.dob).getMonth() === this.props.index).length;
        if (length > 10){
            return 'Month red';
        }
        else if (length > 6){
            return 'Month green';
        }
        else if (length > 2){
            return 'Month blue';
        }
        return 'Month gray';
    }

    render() {
        return <div className={this.getClassName()} onMouseEnter={this.handleMouse.bind(this, this.props.month)} onMouseLeave={this.handleMouse}>{this.props.month}</div>
    }
}

export default Month;