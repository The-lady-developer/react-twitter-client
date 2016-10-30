import React, { Component } from 'react';
import { Link } from 'react-router';
// import $ from 'jquery';

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
      let media = false;
      if (tweet.entities.media) {
        media = tweet.entities.media[0].media_url;
      } else {
        media = 'http://pbs.twimg.com/media/CvricOXXgAAme3s.jpg';
      }

      return {
        id: tweet.id,
        name: tweet.user.name,
        screen_name: tweet.user.screen_name,
        avatar: tweet.user.profile_image_url,
        text: tweet.text,
        media: media
      };
    });

    this.setState( { tweets } );
  }

  async componentDidMount() {
    const intervalId = setInterval(() => {
      let tweets = this.state.tweets;
      tweets.push(tweets.shift());
      this.setState( {tweets} );
    }, this.state.duration * 1000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
   clearInterval(this.state.intervalId);
  }

  render() {
    let tweet = this.state.tweets[0];
    const alt = 'Picture of ' + tweet.name;
    const hasTweetMedia = (tweet.media ? 'wrapper has-tweet-media' : 'wrapper');
    const media = (tweet.media ? <img className="tweet-img" src={tweet.media} role="presentation" /> : '');

    return (
      <div className="Tweet">
        <div className="Tweet-intro">
          <p>
            <Link to={`/dashboard`}>Dashboard</Link>
          </p>

          <p>
            Query: {this.state.query}<br />
            Duration: {this.state.duration}<br />
            Video: {this.state.autoplay}<br />
          </p>
        </div>


        <div id="tweets">
          <div className={hasTweetMedia} key={tweet.id.toString()}>

            <div className="author-wrapper">
              <div className="author">
                <img className="avatar" src={tweet.avatar} alt={alt} />
                <h1 className="author-name">{tweet.name}</h1>
                <h2 className="author-username">@{tweet.screen_name}</h2>
              </div>

              <div className="text">
                {tweet.text}
              </div>
            </div>

            {media}
          </div>
        </div>

      </div>
    );
  }
}

export default Tweet;
