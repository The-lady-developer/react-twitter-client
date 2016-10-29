import React, { Component } from 'react';
import { Link } from 'react-router';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <Link to={`/dashboard`}>Dashboard</Link>
        </p>
      </div>
    );
  }
}

export default App;
