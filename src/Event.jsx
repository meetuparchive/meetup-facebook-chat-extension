import React from 'react';
import moment from 'moment';

import AvatarList from './AvatarList';
import ShareButton from './Share';

const DATE_FORMAT = 'dddd, MMM d [at] h:mma';

const Event = ({ event }) => (
  <li className='gridList-item'>
    <div className="card" style={{ minHeight: '0' }}>
      <a href={event.link}>
        <h3 className='half-chunk headline'>{event.name}</h3>
        <p className='secondary half-chunk smaller'>{event.group.name}</p>
        <div className='chunk smaller'>
          <p className='secondary'>{ moment(event.time).format(DATE_FORMAT) }</p>
          { event.venue && event.venue.name &&
            <p className='secondary'>{event.venue.name}</p>
          }
        </div>
      </a>
      <div className='row chunk'>
        <div className='row-item'>
          { event.rsvp_sample &&
            <AvatarList
              members={event.rsvp_sample.map(rsvp => rsvp.member)}
              totalRsvps={event.yes_rsvp_count}
            />
          }
        </div>
        <div className='row-item row-item--shrink valign--middle'>
          <ShareButton event={event} />
        </div>
      </div>
    </div>
  </li>
);

export default Event;
