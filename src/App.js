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
import TrainModal from "./components/Modal";
import Moment from "react-moment";

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
          trainDestination: items[item].trainDestination.toUpperCase(),
          trainDepart: items[item].trainDepart.toUpperCase(),
          firstTrain: items[item].firstTrain,
        });
      }
      console.log(newState);
      setTrains(newState);
    });
  }, []);

  const removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/trains/${itemId}`);
    console.log(itemRef);
    itemRef.remove();
  };

  return (
    <div className={classes.root} id="primeGrid">
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                Pratt International Train Station
              </Typography>
              <Moment format="MMMM Do YYYY, h:mm:ss a" interval={1000}/>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
      <Grid item xs={3} />
        <Grid item xs={6} id="trainList">
          <h3 id="trainListTitle">Train Schedule</h3>
          <TrainModal />
          {trains.map((item) => {
            return (
              <Grid item xs={12}>
                <div key={item.id} className="train">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="trainButton"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </Button>
                  <h3>{item.trainDestination}</h3>
                  <p>
                    {item.trainDepart} IN: {item.time}
                  </p>
                </div>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
}

export default App;
