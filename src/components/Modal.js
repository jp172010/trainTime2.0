import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import firebase from "../firebase.js";
import "./modal.css";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
}));

export default function TrainModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState("");
  const [thirdInputValue, setThirdInputValue] = useState("");
  const [fourthInputValue, setFourthInputValue] = useState("");
  const [trainDestination, setTrainDestination] = useState("");
  const [time, setTime] = useState("");
  const [trainDepart, setTrainDepart] = useState("");
  const [firstTrain, setFirstTrain] = useState("");

  const accountTypes = [
    {
      accountType: "Arriving",
    },
    {
      accountType: "Departing",
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemsRef = firebase.database().ref("trains");
    const item = {
      trainDepart: trainDepart,
      trainDestination: trainDestination,
      time: time,
      firstTrain: firstTrain,
    };
    itemsRef.push(item);
    setInputValue("");
    setSecondInputValue("");
    setThirdInputValue("");
    setFourthInputValue("");
    setTrainDestination("");
    setTime("");
    setTrainDepart("");
    handleClose();
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    setTrainDestination(value);
  };
  const onChange2 = (e) => {
    const { value } = e.target;
    setSecondInputValue(value);
    setTime(value);
  };
  const onChange3 = (e) => {
    const { value } = e.target;
    setThirdInputValue(value);
    setTrainDepart(value);
  };
  const onChange4 = (e) => {
    const { value } = e.target;
    setFourthInputValue(value);
    setFirstTrain(value);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <h3 id="simple-modal-title">Add New Train</h3>
        </Grid>
        <Grid item xs={6}>
          <button id="modalClose" onClick={handleClose}>
            ×
          </button>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="thirdInput"
              select
              type="text"
              label="Select"
              name="trainDepart"
              className={classes.textField}
              value={thirdInputValue}
              onChange={onChange3}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select Arriving or Departing"
              margin="normal"
              variant="filled"
            >
              {accountTypes.map((option) => (
                <MenuItem key={option.accountType} value={option.accountType}>
                  {option.accountType}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <TextField
              id="firstInput"
              type="text"
              name="trainDestination"
              value={inputValue}
              placeholder="Destination?"
              onChange={onChange}
            />
            <br />
            <TextField
              id="secondInput"
              type="text"
              name="time"
              value={secondInputValue}
              placeholder="How often does it arrive?"
              onChange={onChange2}
            />
            <br />
            <TextField
              id="fourthInput"
              type="text"
              name="firstTrain"
              value={fourthInputValue}
              placeholder="Time of first train"
              onChange={onChange4}
            />
            <br />
            <button>Add Train</button>
          </form>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <button id="modalButton" type="button" onClick={handleOpen}>
            Add New Train
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
          >
            {body}
          </Modal>
        </Grid>
      </Grid>
    </div>
  );
}
