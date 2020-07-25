import React, { useMemo } from "react";
import PropTypes from "prop-types";
//styles
import "./Month.scss";

const Month = ({ onMouseEnter, onMouseLeave, month, length }) => {
  const handleMouseEnter = () => {
    onMouseEnter(month);
  };

  const handleMouseLeave = () => {
    onMouseLeave();
  };

  const className = useMemo(() => {
    if (length === undefined) return "gray";

    return length > 10
      ? "red"
      : length > 6
      ? "green"
      : length > 2
      ? "blue"
      : "gray";
  }, [length]);

  return (
    <div
      className={`months__month ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {month}
    </div>
  );
};

Month.propTypes = {
  month: PropTypes.string.isRequired,
  length: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default Month;
