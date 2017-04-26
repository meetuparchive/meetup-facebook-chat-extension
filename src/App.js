import React, { Component } from 'react';
import Cookie from 'js-cookie';
import queryString from 'query-string';

import Login from './Login';
import Search from './Search';
import EventList from './EventList';

const getToken = () => {
  // #access_token=TOKEN&token_type=bearer&expires_in=72576000&scope=rsvp+ageless
  const { access_token } = queryString.parse(window.location.hash);
  if(access_token) {
    Cookie.set('oath_token', access_token);
    return access_token;
  }
  return Cookie.get('oath_token');
};

class App extends Component {

  state = {};

  handleSearchSuccess = (events) => {
    this.setState({ events })
  };

  render() {
    const token = getToken();
    console.log(this.state);
    return (
      <div>
        <section className='stripe'>
          <div className='bounds'>
            { token ?
              <Search
                token={token}
                handleSearchSuccess={this.handleSearchSuccess} /> :
              <Login /> }
          </div>
        </section>
        { this.state.events &&
          <section className='stripe--collection'>
            <div className='bounds'>
              <EventList events={this.state.events} />
            </div>
          </section>
        }
      </div>
    );
  }
}

export default App;
