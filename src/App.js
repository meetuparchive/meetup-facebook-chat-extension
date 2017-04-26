import React, { Component } from 'react';
import Cookie from 'js-cookie';
import queryString from 'query-string';

import Login from './Login';
import Search from './Search';

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
  render() {
    const token = getToken();
    return (
      <section className='container'>
        { token ?
          <Search token={token} /> :
          <Login /> }
        { /* list of shareable categories as default view */ }
      </section>
    );
  }
}

export default App;
