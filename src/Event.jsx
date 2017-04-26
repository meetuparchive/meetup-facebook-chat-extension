import React from 'react';
import moment from 'moment';

const Event = ({ event }) => (
  <li className='gridList-item'>
    <div className="card" style={{ minHeight: '0' }}>
      <div className='row chunk'>
        <div className='row-item'>
          <h3>{event.name}</h3>
          <h4>{event.group.name}</h4>
          <small>{ moment(event.time).format('LLLL') }</small>
        </div>
        <div className='valign--middle row-item row-item--shrink'>
          share button
        </div>
      </div>
    </div>
  </li>
);

export default Event;
