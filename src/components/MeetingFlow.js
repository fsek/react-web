import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Meeting from './Meeting';
import MeetingSocket from '../utils/meeting-socket';
import Axios from 'axios';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  dayBreakpoint: {
    color: 'rgba(0, 0, 0, 0.5)',
  }
}));
/*
const meetings = [
  {
    title: "Fredriks hörna",
    start: "2019-12-13 13:37:00",
    end: "2019-12-13 15:37:00",
    "council": "Freddes grädde"
  },
  {
    title: "Luke the Duke needs to puke",
    start: "2019-12-14 03:00:00",
    end: "2019-12-14 04:00:00",
    council: "Donken"
  },
  {
    title: "Tonys datorbygge",
    start: "2019-12-16 14:00:00",
    end: "2019-12-16 21:00:00",
    council: "Compoot"
  }
] */

const addMeeting = (meetings, meeting) => {
  const newMeetings = _.clone(meetings);
  newMeetings.push(meeting);
  return _.sortBy(newMeetings, 'start_date');
}

const updateMeeting = (meetings, meeting) => {
  const newMeetings = _.reject(meetings, {'id': meeting.id});
  newMeetings.push(meeting);
  return _.sortBy(newMeetings, 'start_date');
}

const deleteMeeting = (meetings, meeting) => {
  return _.reject(meetings, {'id': meeting.id});
}

/* const handleReceivedMeetings = (payload) => {
  const { meeting, method } = payload;
  console.log(payload);
  let newMeetings;
  if (method === 'CREATE') {
    newMeetings = addMeeting(meeting);
  } else if (method === 'UPDATE') {
    newMeetings = updateMeeting(meeting);
  } else {
    newMeetings = deleteMeeting(meeting);
  }

  return newMeetings;
} */

const MeetingFlow = ({setOccupied}) => {
  //let refDate = meetings[0]['start'];

  const [meetings, setMeetings] = useState([]);
  const [payload, setPayload] = useState({
    meeting: {},
    method: ''
  });
  const classes = useStyles();

  const getFirstBreakpoint = () => {

  }


  const getDayDiff = (d1, d2) => {
    const msInDay = 1000*60*60*24;
    console.log(Math.floor(d1 / msInDay), Math.floor(d2 / msInDay))
    return Math.abs(Math.floor(d1 / msInDay) - Math.floor(d2 / msInDay));
  }

  const getDateString = (date) => {
    const dayNames = [ 'Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    const mDateNow = moment(),
          mDateThen = moment(date);
    const dayDiff = mDateNow.diff(mDateThen, 'days');

    if(dayDiff == 0) {
      return 'Idag';
    } else if(dayDiff === 1) {
      return 'Imorgon';
    } else if(dayDiff < 7) {
      return dayNames[date.getDay()];
    } else {
      return date.toLocaleString('sv-SV', {weekday: 'short', month: 'short', day: 'numeric' });
    }
  }

  const getDayBreakpoint = (m) => {
    const idx = _.findIndex(meetings, {'id': m.id});
    const thisDate = new Date(m.start_date);
    let dateString = '';
    if(idx === 0) {
      dateString = getDateString(thisDate);
    } else {
      const prevDate = new Date(meetings[idx-1].start_date);

      if(getDayDiff(thisDate, prevDate) > 0) {
        dateString = getDateString(thisDate);
      }
    }

    if(dateString) {
      return <Typography className={classes.dayBreakpoint} variant="p">{dateString}</Typography>
    } else {
      return '';
    }



  }

  /* const isNewDay = (currDate) => {
    if (currDate === refDate) {
      return true
    }

    const d1 = Date.parse(refDate);
    const d2 = Date.parse(currDate);
    const msInDay = 1000*60*60*24;
    return d1.getTime() % msInDay !== d2.getTime() % msInDay
  } */

  useEffect(() => {
    Axios.get('http://localhost:3000/api/meetings')
    .then(resp => {
      console.log(resp);
      setMeetings(m => m = resp.data.meetings);
    })

    const meetingChannel = new MeetingSocket({
      onUpdate: setPayload
    })

    meetingChannel.subscribe();
  }, []);

  useEffect(() => {
    const { meeting, method } = payload;
    let newMeetings;
    if (method === 'CREATE') {
      newMeetings = addMeeting(meetings, meeting);
    } else if (method === 'UPDATE') {
      newMeetings = updateMeeting(meetings, meeting);
    } else {
      newMeetings = deleteMeeting(meetings, meeting);
    }
    console.log(method, newMeetings);
    setMeetings(newMeetings);
  }, [payload])

  const renderString = () => {
    console.log(meetings)
    if(meetings !== null) {

      if (meetings.length > 0) {
        const meeting = meetings[0];
        const now = moment();
        const mStart = moment(meeting.start_date),
              mEnd = moment(meeting.end_date);

        setOccupied(now > mStart && now < mEnd)
      }

      return (
        <Grid container item spacing={2} md={8} sm={12}>
          {getFirstBreakpoint()}
          {
            meetings.map((m) => {
              const breakpoint = getDayBreakpoint(m);
              return (
                <>
                  {breakpoint}
                  <Grid key={m.id} item xs={12}>
                    <Meeting {...m} />
                  </Grid>
                </>
              )
            })
          }
        </Grid>
      )
    } else {
      return ''
    }
  }

  return renderString();

}


export default MeetingFlow;
