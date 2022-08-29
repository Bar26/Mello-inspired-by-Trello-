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
    backgroundColor: '#5ba4cf',
    borderRadius: 'inherit',
    textAlign: 'right',
    // TransitionEvent:'',
    transition:'0.4s'
  }
  
  const fillerStyles2={
    height: '100%',
    width: `${completed}%`,
    backgroundColor: '#61bd4f',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition:'0.4s'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={completed===100? fillerStyles2:fillerStyles}>
      <span style={labelStyles}></span>
      </div>
    </div>
  );
};

export default ProgressBar;

