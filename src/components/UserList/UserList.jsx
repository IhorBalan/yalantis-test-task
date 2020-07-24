import React from "react";
import PropTypes from "prop-types";
//styles
import "./UserList.scss";

const UserList = ({ users }) => {
  return (
    <div className="user-list__list">
      {users.map((user) => {
        return (
          <div className="user-list__item" key={user.id}>
            {user.firstName} {user.lastName}
          </div>
        );
      })}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
};

export default UserList;
