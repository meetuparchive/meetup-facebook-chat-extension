import React, { Component } from 'react';

import Search from './Search';

class App extends Component {
  render() {
    return (
      <section className='container'>
        <Search />
        { /* list of shareable categories as default view */ }
      </section>
    );
  }
}

export default App;
