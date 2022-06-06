import React from "react";

const ProgressBar = ({ completed }) => {

  const containerStyles = {
    height: 8,
    borderRadius: 4,
    width: '100%',
    backgroundColor: "#091e4214",
    borderRadius: 50,
    margin: '0 0 0 40',
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: 'blue',
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
      <span style={labelStyles}></span>
      </div>
    </div>
  );
};

export default ProgressBar;

