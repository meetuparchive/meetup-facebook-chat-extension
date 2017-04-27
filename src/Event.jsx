import React from 'react';
import moment from 'moment';

import ShareButton from './Share';

const Event = ({ event }) => (
  <li className='gridList-item'>
    <div className="card" style={{ minHeight: '0' }}>
      <div className='row chunk'>
        <a href={event.link} className='row-item'>
          <h3>{event.name}</h3>
          <p className='chunk'>{event.group.name}</p>
          <small>{ moment(event.time).format('LLLL') }</small>
        </a>
        <div className='valign--middle row-item row-item--shrink'>
          <ShareButton event={event} />
        </div>
      </div>
    </div>
  </li>
);

export default Event;
