import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Meeting from './Meeting';
import MeetingSocket from '../utils/meeting-socket';
import Axios from 'axios';
import _ from 'lodash';
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

const deleteMeeting = (meetings, meeting) => {
  return _.reject(meetings, {'id': meeting.id});
}

const updateMeeting = (meetings, meeting) => {
  console.log(meetings)
  console.log(meeting, meeting.id)
  const newMeetings = _.reject(meetings, {'id': meeting.id});
  console.log(newMeetings)
  newMeetings.push(meeting);
  console.log(newMeetings)
  return _.sortBy(newMeetings, 'start_date');
}

const addMeeting = (meetings, meeting) => {
  const newMeetings = _.clone(meetings);
  newMeetings.push(meeting);
  return _.sortBy(newMeetings, 'start_date');
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

const MeetingFlow = () => {
  //let refDate = meetings[0]['start'];

  const [meetings, setMeetings] = useState([]);

  const getFirstBreakpoint = () => {

  }

  const getDayBreakpoint = () => {

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
      setMeetings(m => m = resp.data.meetings);
    })
  }, [])

  useEffect(() => {
    const handleReceivedMeetings = (payload) => {
      const { meeting, method } = payload;
      console.log(payload);
      let newMeetings;
      if (method === 'CREATE') {
        newMeetings = addMeeting(meetings, meeting);
      } else if (method === 'UPDATE') {
        newMeetings = updateMeeting(meetings, meeting);
      } else {
        newMeetings = deleteMeeting(meetings, meeting);
      }
      setMeetings(newMeetings);
    }

    const meetingChannel = new MeetingSocket({
      onUpdate: handleReceivedMeetings
    })

    meetingChannel.subscribe();
  }, [])

  const renderString = () => {
    console.log(meetings)
    if(meetings !== null) {
      return (
        <Grid container item spacing={2} md={8} sm={12}>
          {getFirstBreakpoint()}
          {
            meetings.map((m) => {
              return (
                <Grid item xs={12}>
                  <Meeting {...m} />
                </Grid>
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
