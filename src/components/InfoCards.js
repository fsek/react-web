import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  infoPaper: {
    flexGrow: 0
  },
  meetingStatus: {
    extends: 'infoCard',
    background: 'linear-gradient(146.5deg, #2FCB71 21.43%, #0E8942 82.73%);',
    padding: '32px 16px',
    textAlign: 'center',
    color: 'white',
    '& h5': {
      fontSize: '2rem'
    },
    '&.occupied': {
      background: 'linear-gradient(146.5deg, #EB5757 21.43%, #9C6767 82.73%)',
    },
  },
  time: {
    textAlign: 'center',
    color: 'white',
    padding: '16px',
    background: 'linear-gradient(142.32deg, #292D57 21.43%, #061E4B 82.73%)'
  },
  date: {
    textAlign: 'center',
    color: 'white',
    background: 'linear-gradient(147.84deg, #2F80ED 21.43%, #2D9CDB 82.73%)',
    padding: '16px'
  }

}))

const InfoCards = () => {
  const classes = useStyles();

  const getTimeString = (dateObj) => {
    const hour = `0${dateObj.getHours()}`.slice(-2);
    const minute = `0${dateObj.getMinutes()}`.slice(-2);
    const second = `0${dateObj.getSeconds()}`.slice(-2);

    return `${hour}:${minute}:${second}`
  }

  const getDateString = (dateObj) => {
    return dateObj.toLocaleDateString('sv-SE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  }

  const [time, setTime] = useState(getTimeString(new Date()));
  const [date, setDate] = useState(getDateString(new Date()));

  const [occupied, setOccupied] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const dateObj = new Date();
      setTime(getTimeString(dateObj))
      setDate(getDateString(dateObj))
    }, 1000)
  })

  return (
  <Grid container item spacing={2} md alignContent="flex-start">
    <Grid className={classes.infoPaper} item xs={12}>
      <Paper className={`${classes.meetingStatus} ${occupied ? 'occupied' : ''}`} square={true}>
        <Typography variant="h5">
          {occupied ? 'Pågående möte' : 'Ledigt'}
        </Typography>
      </Paper>
    </Grid>
    <Grid className={classes.infoPaper} item xs={12}>
      <Paper className={classes.time} square={true}>
        <Typography variant="h3">
          {time}
        </Typography>
      </Paper>
      <Paper className={classes.infoPaper} square={true}>
        <Typography className={classes.date} variant="h3">
          {date}
        </Typography>
      </Paper>
    </Grid>
  </Grid>
  )
}


export default InfoCards;
