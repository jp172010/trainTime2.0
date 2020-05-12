import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
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

  const trainTypes = [
    {
      trainType: "Arriving",
    },
    {
      trainType: "Departing",
    },
  ];

  const trainFrequency = [
    {
      frequency: "30 minutes"
    },
    {
      frequency: "1 hour"
    },
    {
      frequency: "2 hours"
    },
    {
      frequency: "4 hours"
    },
    {
      frequency: " 8 hours"
    },
    {
      frequency: "16 hours"
    },
    {
      frequency: "32 hours"
    },
  ]

  const trainTimes = [
    {
      trainTime: "8:00 AM",
    },
    {
      trainTime: "9:00 AM",
    },
    {
      trainTime: "10:00 AM",
    },
    {
      trainTime: "11:00 AM",
    },
    {
      trainTime: "12:00 PM",
    },
    {
      trainTime: "1:00 PM",
    },
    {
      trainTime: "2:00 PM",
    },
    {
      trainTime: "3:00 PM",
    },
    {
      trainTime: "4:00 PM",
    },
    {
      trainTime: "5:00 PM",
    },
    {
      trainTime: "6:00 PM",
    },
    {
      trainTime: "7:00 PM",
    },
    {
      trainTime: "8:00 PM",
    },
  ]

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
          <Button
            variant="contained"
            color="secondary"
            id="modalClose"
            onClick={handleClose}
          >
            ×
          </Button>
        </Grid>
        <Grid item xs={12}>
          <form>
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
              {trainTypes.map((option) => (
                <MenuItem key={option.trainType} value={option.trainType}>
                  {option.trainType}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <TextField
              id="secondInput"
              select
              type="text"
              label="Select"
              name="time"
              className={classes.textField}
              value={secondInputValue}
              onChange={onChange2}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Frequency"
              margin="normal"
              variant="filled"
            >
              {trainFrequency.map((option) => (
                <MenuItem key={option.frequency} value={option.frequency}>
                  {option.frequency}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <TextField
              id="fourthInput"
              select
              type="text"
              label="Select"
              name="firstTrain"
              className={classes.textField}
              value={fourthInputValue}
              onChange={onChange4}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Time of first train"
              margin="normal"
              variant="filled"
            >
              {trainTimes.map((option) => (
                <MenuItem key={option.trainTime} value={option.trainTime}>
                  {option.trainTime}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <Button id="addTrainButton" variant="contained" color="secondary" onClick={handleSubmit}>
              Add Train
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            id="modalButton"
            type="button"
            onClick={handleOpen}
          >
            Add New Train
          </Button>
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
