import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(2)}px` ,
    color: theme.palette.text.secondary,
    borderLeft: "7px solid",
    borderColor: theme.palette.primary.main
  },
  paperHeader: {
    color: 'rgba(0, 0, 0, 0.75)',
  },
  iconWithText: {
    display: 'flex',
    alignItems: 'center',
    '& span': {
      marginLeft: '10px',
      color: theme.palette.text.primary
    }
  }
}))

const Meeting = ({title, start_date, end_date, council}) => {
  const classes = useStyles();

  return (
  <Paper className={classes.paper} square={true}>
    <Typography className={classes.paperHeader} variant="h5">
      {title}
    </Typography>
    <p className={classes.iconWithText}><AccessTimeIcon /><span>{new Date(start_date).toLocaleTimeString(['sv-SE'], { hour: '2-digit', minute: '2-digit' })} - {new Date(end_date).toLocaleTimeString(['sv-SE'], { hour: '2-digit', minute: '2-digit' })}</span></p>
    {council !== null ? <p className={classes.iconWithText}><GroupIcon /><span>{council}</span></p> : '' }
  </Paper>
  )
}


export default Meeting;
