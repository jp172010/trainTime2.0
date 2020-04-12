import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import firebase from "./firebase.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [trainDestination, setTrainDestination] = useState("");
  const [time, setTime] = useState("");
  const [trains, setTrains] = useState([]);


  useEffect(() => {
    const itemsRef = firebase.database().ref("trains");
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          time: items[item].time,
          trainDestination: items[item].destination,
        });
      }
      console.log(newState);
      setTrains(newState);
    });
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const itemsRef = firebase.database().ref("trains");
    const item = {
      destination: trainDestination,
      time: time,
    };
    console.log(itemsRef);
    console.log(item);
    itemsRef.push(item);
    setTrainDestination("");
    setTime("");
  };

  const removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/trains/${itemId}`);
    console.log(itemRef)
    itemRef.remove();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="trainDestination"
              placeholder="Where is the train going?"
              onChange={(e) => setTrainDestination(e.target.value)}
            />
            <input
              type="text"
              name="time"
              placeholder="How often does the train arrive?"
              onChange={(e) => setTime(e.target.value)}
            />
            <button>Add Train</button>
          </form>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <ul>
          {trains.map((item) => {
            console.log(item);
            return (
              <Grid item xs={3}>
                <li key={item.id}>
                  <h3>{item.trainDestination}</h3>
                  <p>
                    Arriving In: {item.time}
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </p>
                </li>
              </Grid>
            );
          })}
        </ul>
      </Grid>
    </div>
  );
}

export default App;
