import React from 'react';
import Event from './Event';

const EventsList = ({ events }) => (
  <ul className='gridList gridList--has1 atMedium_gridList--has3'>
    { events.map((event, i) => <Event event={event} key={i} />) }
  </ul>
);

export default EventsList;
