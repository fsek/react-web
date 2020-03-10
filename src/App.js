import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import MeetingFlow from './components/MeetingFlow';
import InfoCards from './components/InfoCards';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.background.light.main,
    minHeight: "100vh",
    fontFamily: "Roboto Condensed, sans-serif",
    color: 'rgba(0, 0, 0, 0.75)',
  },
  header: {
    height: "100px",
    padding: "30px",
    boxSizing: "border-box",
    marginBottom: "20px"
  },
  headerIcon: {
    fontSize: "50px",
    color: theme.palette.primary.main,
    display: "inline"
  },
  titleIcon: {
    position: "relative"
  },
  headerTitle: {
    fontSize: "2em",
    color: theme.palette.primary.main,
    marginLeft: "40px",
    display: "inline",
    position: "absolute",
    top: "10px"
  }
}));

function App() {
  const classes = useStyles();
  const [occupied, setOccupied] = useState(false)
  return(
      <div className={classes.root}>
        <Container>
          <Box className={classes.header}>
            <Box className={classes.titleIcon}>
              <MeetingRoomIcon className={classes.headerIcon}/>
              <Typography className={classes.headerTitle} variant="h1">
                Möten i Ledningscentralen
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <MeetingFlow setOccupied={setOccupied} />
            <InfoCards occupied={occupied} />
          </Grid>
        </Container>
      </div>
  )
}

export default App;
