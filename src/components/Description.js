import React from "react";

class Description extends React.Component {

    render() {
        return <ul className="Description">
            {this.props.users.map(user => {
                return <li key={user.id}>
                    {user.firstName} {user.lastName}
                </li>;
            })}
        </ul>
    }
}

export default Description;