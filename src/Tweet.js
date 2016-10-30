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
        id: '',
        name: '',
        screen_name: '',
        avatar: '',
        text: '',
        media: { type: '', url: '', sizes: {w: '', h: ''} }
      }]
    };
  }

  deepSearch(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    };
    return obj;
  };

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
      let type = false;
      let sizes = {w: '', h: ''};

      console.log(this.deepSearch(tweet, 'youtu'));

      if (tweet.entities.media) {
        if (tweet.extended_entities.media[0].type === 'photo') {
          type = 'photo';
          media = tweet.extended_entities.media[0].media_url;
        } else if (tweet.extended_entities.media[0].type === 'video') {
          type = 'video';
          media = tweet.extended_entities.media[0].video_info.variants.find((x) => x.bitrate === 832000).url;
          sizes.w = tweet.extended_entities.media[0].sizes.large.w;
          sizes.h = tweet.extended_entities.media[0].sizes.large.h;
        } else if (this.deepSearch(tweet, 'youtu.be')) {
          console.log('yay!');
          type = 'youtube';
          media = tweet.entities.urls[0].display_url.split('/')[1];
        }
      }

      return {
        id: tweet.id,
        name: tweet.user.name,
        screen_name: tweet.user.screen_name,
        avatar: tweet.user.profile_image_url,
        text: tweet.text,
        media: { type, url: media, sizes }
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
    let media;

    if (tweet.media && tweet.media.type === 'photo') {
      media = <div className="media-wrapper"><img className="tweet-img" src={tweet.media.url} role="presentation" /></div>;
    } else if (tweet.media && tweet.media.type === "video") {
      const url = tweet.media.url + '?autoplay=' + this.state.autoplay + '&loop=1';
      media = <div className="media-wrapper"><iframe className="tweet-img" width={tweet.media.sizes.w} height={tweet.media.sizes.h} src={url} frameBorder="0"></iframe></div>;
    } else if (tweet.media && tweet.media.type === "youtube") {
      const url = tweet.media.url + '?autoplay=' + this.state.autoplay + '&loop=1';
      media = <div className="media-wrapper"><iframe className="tweet-img" width={tweet.media.sizes.w} height={tweet.media.sizes.h} src={url} frameBorder="0"></iframe></div>;
    }

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
                <div className="author-details">
                  <h1 className="author-name">{tweet.name}</h1>
                  <h2 className="author-username">@{tweet.screen_name}</h2>
                </div>
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
