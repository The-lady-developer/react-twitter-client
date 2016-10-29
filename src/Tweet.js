import React, { Component } from 'react';
import { Link } from 'react-router';

import './Tweet.css';

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.location.query.q,
      duration: this.props.location.query.duration,
      autoplay: this.props.location.query.video,
      tweets: [{
        id: "xx",
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
      const alt = 'Picture of ' + tweet.name;
      return <p key={tweet.id.toString()}>
          <img src={tweet.avatar} alt={alt} /> {tweet.name} <br /> @{tweet.screen_name}<br /><br />
          {tweet.text}<br /><br /><br />
        </p>;
    });

    return (
      <div className="Tweet">
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
