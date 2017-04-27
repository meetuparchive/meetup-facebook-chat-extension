import React from 'react';

import Avatar from './Avatar';

const AvatarList = ({ members, totalRsvps }) => (
  <ul className='inlineblockList'>{ members.map((member, i) => (
    <li className='avatar-overlap' key={i}><Avatar style={{zIndex: 100-i}} member={member} /></li>
  ))}
  { totalRsvps &&
    <li className='secondary'>{totalRsvps}</li>
  }</ul>
);

export default AvatarList;
