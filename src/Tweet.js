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
      autoplay: this.props.location.query.video,
      tweets: [{
        id: 0,
        name: "Dummy Name",
        screen_name: "dummy_screen_name",
        avatar: "dummyurl.jpg",
        text: "Dummy text ipsum. #Hashtax"
      }]
    };
  }

  async getTweets() {
    try {
      let response = await fetch(`https://cloud.viewneo.com/social/twitter/search?q=${this.state.query}`);
      let responseJson = await response.json();

      return responseJson.statuses;
    } catch (error) {
      console.error(error);
    }
  }

  async componentWillMount() {
    const fetchedTweets = await this.getTweets();

    let tweets = fetchedTweets.map( (tweet) => {
      return {
        id: tweet.id,
        name: tweet.user.name,
        screen_name: tweet.user.screen_name,
        avatar: tweet.user.profile_image_url,
        text: tweet.text
      };
    });

    this.setState( { tweets } );
  }

  async componentDidMount() {
    // populate();
  }

  render() {
    let tweets = this.state.tweets.map( (tweet) => {
      return <div>
          <p key={tweet.id}>
            <img src={tweet.avatar} alt="Picture of {tweet.name}" /> {tweet.name} @{tweet.screen_name}<br />
            {tweet.text}
          </p><hr />
        </div>;
    });

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

        <hr />

        <div>
          {tweets}
        </div>

      </div>
    );
  }
}

export default Tweet;
