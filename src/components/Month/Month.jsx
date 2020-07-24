import React from "react";
import PropTypes from "prop-types";
import "./Month.scss";

class Month extends React.Component {
  handleMouseEnter = () => {
    this.props.onMouseEnter(this.props.month);
  };

  handleMouseLeave = () => {
    this.props.onMouseLeave();
  };

  getClassName = () => {
    if (this.props.length === undefined) return "gray";

    return this.props.length > 10
      ? "red"
      : this.props.length > 6
      ? "green"
      : this.props.length > 2
      ? "blue"
      : "gray";
  };

  render() {
    return (
      <div
        className={`months__month ${this.getClassName()}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.month}
      </div>
    );
  }
}

Month.propTypes = {
  month: PropTypes.string.isRequired,
  length: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default Month;
