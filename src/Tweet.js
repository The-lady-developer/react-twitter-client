import React, { Component } from 'react';
import { Link } from 'react-router';

import logo from './logo.svg';
import './Tweet.css';

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.location.query.q,
      duration: this.props.location.query.duration,
      autoplay: this.props.location.query.video
    };
  }

  componentWillMount() {
    fetch(`https://cloud.viewneo.com/social/twitter/search?q=${this.state.query}`)
      .then( (response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      });
  }

  render() {
    return (
      <div className="Tweet">
        <div className="Tweet-header">
          <img src={logo} className="Tweet-logo" alt="logo" />
          <h2>The Tweet</h2>
        </div>

        <p className="Dashboard-intro">
          <Link to={`/dashboard`}>Dashboard</Link>
        </p>


        <p className="Tweet-intro">
          Query: {this.state.query}<br />
          Duration: {this.state.duration}<br />
          Video: {this.state.autoplay}<br />
        </p>
      </div>
    );
  }
}

export default Tweet;
