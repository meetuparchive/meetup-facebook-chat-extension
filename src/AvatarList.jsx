import React from 'react';

import Avatar from './Avatar';

const AvatarList = ({ members, totalRsvps }) => (
  <ul className='inlineblockList'>{ members.map((member, i) => (
    <li key={i}><Avatar member={member} /></li>
  ))}
  { totalRsvps &&
    <li className='secondary'>{totalRsvps}</li>
  }</ul>
);

export default AvatarList;
