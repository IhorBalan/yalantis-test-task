import React from "react";
import PropTypes from "prop-types";
//styles
import "./Month.scss";

class Month extends React.Component {
  handleMouseEnter = () => {
    this.props.onMouseEnter(this.props.month);
  };

  handleMouseLeave = () => {
    this.props.onMouseLeave();
  };

  getClassName = () => {
    const { length } = this.props;

    if (length === undefined) return "gray";

    return length > 10
      ? "red"
      : length > 6
      ? "green"
      : length > 2
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
