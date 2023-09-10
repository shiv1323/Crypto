import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    border: "1px solid #545fc4",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Lato",
    cursor: "pointer",
    color: "black",
    fontWeight: 500,
    backgroundColor: "#fff", // Default background color
    boxShadow: "rgb(84, 95, 196) 0px 0px 20px",
    "&:hover": {
      backgroundColor: "#90CAF9",
    },
    width: "22%",
  },
  selectedButton: {
    backgroundColor: "#545fc4", // Background color when selected
    color: "black", // Text color when selected
    fontWeight: 700,
  },
}));

const SelectedButton = ({ children, selected, onClick }) => {
  const classes = useStyles();

  return (
    <span
      className={`${classes.button} ${selected ? classes.selectedButton : ""}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default SelectedButton;
