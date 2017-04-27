import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import queryString from 'query-string';
import moment from 'moment';
import { EVENT_DATA } from './data';
import Hscroll from 'meetup-web-components/lib/Hscroll';

const styles = {
  card: {
    height: '180px',
    width: '150px',
    backgroundColor: '#fff',
    margin: '10px',
    marginLeft: '2px',
    borderRadius: '3px',
    display: 'inline-block',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,.31)',
  },
  header: {
    backgroundColor: '#321da2',
    backgroundSize: 'cover',
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
    display: 'flex',
    height: '100px',
    padding: '10px',
  },
  info: {
    color: '#434343',
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '50px',
    flexDirection: 'column',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  title: {
    whiteSpace: 'normal',
    color: '#fff',
    fontSize: '14px',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  subtitle: {
    display: 'block',
    height: '25px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: 'inherit',
    fontSize: '11px',
    lineHeight: '1.1em',
    fontWeight: '500',
  },
  share: {
    fontSize: '12px',
    color: '#321da2',
    fontWeight: '600',
  },
  date: {
    fontSize: '11px',
    fontWeight: '500',
  },
};

const generateDuotone = (keyPhoto, photoGradient) => {
  if (!keyPhoto) { return; }

  var duotone = 'dt' + photoGradient.dark_color + 'x' + photoGradient.light_color;
  var spec = 'event/rx500x600/' + duotone + '/';
  var base = 'https://a248.e.akamai.net/secure.meetupstatic.com/photo_api/';
  var duotoneUrl = base + spec + keyPhoto.id + '.jpeg';

  return duotoneUrl;
}

const EventCard = ({ event, onShare }) => {
  const duotoneUrl = generateDuotone(event.group.key_photo, event.group.photo_gradient);
  const backgroundUrl = duotoneUrl ? `url(${duotoneUrl})` : undefined;
  return (
    <div style={styles.card}>
      <div style={{ ...styles.header, backgroundImage: backgroundUrl }}>
        <h1 style={styles.title}>{event.name}</h1>
      </div>
      <div style={styles.info}>
        <p style={styles.subtitle}>{event.group.name}</p>
        <div style={styles.bottom}>
          <p style={styles.date}>{moment(event.time).format('ddd LT')}</p>
          <a onClick={onShare} style={styles.share}>Share</a>
        </div>
      </div>
    </div>
  );
}

export default class UpcomingEvents extends Component {
  constructor(props) {
    super(props);
    this.fetchUpcomingEvents = this.fetchUpcomingEvents.bind(this);
    this.handleFetchEventsSuccess = this.handleFetchEventsSuccess.bind(this);

    this.state = { events: [] };
  }

  fetchUpcomingEvents = (coords) => {
    const ENDPOINT = 'https://api.dev.meetup.com/find/upcoming_events';
    const params = queryString.stringify({
      key: process.env.REACT_APP_MEETUP_API_TOKEN,
      fields: 'group_photo_gradient,group_key_photo',
      page: '6',
      ordering: 'time',
      lat: coords.latitude,
      lon: coords.longitude,
    });

    return fetchJsonp(`${ENDPOINT}?${params}`, {
      method: 'GET',
      credentials: 'include'
    });
  }

  handleFetchEventsSuccess(data) {
    this.setState({ events: data.events });
  }

  componentWillMount() {
    this.fetchUpcomingEvents({})
      .then(response => response.json())
      .then(({ data }) =>
        this.handleFetchEventsSuccess(data || EVENT_DATA)
      );
  }

  render() {
    const { events } = this.state;

    return (
      <div>
        <h1>Upcoming Meetups</h1>
        {events.length > 0 &&
          <Hscroll unclipAt='medium'>
            {events.map((event,key) => (
              <EventCard key={key} event={event} />
            ))}
          </Hscroll>
        }
      </div>
    );
  }
}
