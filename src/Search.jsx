import React, { Component } from 'react';

export default class Search extends Component {

  static defaultProps = {
    meetup: ''
  };

  state = {
    meetup: this.props.meetup
  };

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleInputChange = (e) => {
    this.setState({ meetup: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" onChange={this.handleInputChange} className="form-control" id="meetup" name='meetup' value={this.state.meetup} placeholder="Search for Meetups" />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}
