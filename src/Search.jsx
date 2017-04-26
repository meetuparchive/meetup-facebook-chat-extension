import React, { Component } from 'react';
import queryString from 'query-string';
import fetchJsonp from 'fetch-jsonp';

export default class Search extends Component {

  static defaultProps = {
    meetup: '',
    coords: {
      latitude: 40.7259114,
      longitude: -73.99591649999999
    },
    handleSearchSuccess: function() {}
  };

  state = {
    meetup: this.props.meetup
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchEvents()
      .then(response => response.json())
      .then(({ data }) =>
        this.props.handleSearchSuccess(data)
      );
  }

  handleInputChange = (e) => {
    this.setState({ meetup: e.target.value });
  }

  fetchEvents() {
    const ENDPOINT = 'https://api.meetup.com/find/events/';
    const {
      token,
      coords
    } = this.props;
    const {
      meetup
    } = this.state;

    const params = queryString.stringify({
      only: [
        'name',
        'group',
        'link',
        'time',
        'yes_rsvp_count'
      ].join(','),
      access_token: token,
      text: meetup,
      lat: coords.latitude,
      lon: coords.longitude,
    });

    return fetchJsonp(`${ENDPOINT}?${params}`, {
      method: 'GET',
      credentials: 'include'
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="meetup"
          name='meetup'
          placeholder="Search for Meetups"
          className="form-control"
          type="text"
          value={this.state.meetup}
          onChange={this.handleInputChange} />
        <input type="submit" style={{visibility: 'hidden', position: 'absolute'}} />
      </form>
    );
  }
}
