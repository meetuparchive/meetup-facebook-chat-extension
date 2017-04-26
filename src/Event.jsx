import React from 'react';
import moment from 'moment';

const Event = ({ event }) => (
  <li className='gridList-item'>
    <div className="card" style={{ minHeight: '0' }}>
      <div className='row chunk'>
        <div className='row-item'>
          <h3 className="list-group-item-heading">{event.name}</h3>
          <h4 className='list-group-item-text'>{event.group.name}</h4>
          <small>{ moment(event.time).format('LLLL') }</small>
        </div>
        <div className='valign--middle row-item--shrink'>
          share button
        </div>
      </div>
    </div>
  </li>
);

export default Event;
