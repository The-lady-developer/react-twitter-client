import React, { Component } from 'react';
import { Link } from 'react-router';
// import $ from 'jquery';

import './Tweet.css';

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: encodeURIComponent(this.props.location.query.q),
      quantity: this.props.location.query.quantity,
      duration: this.props.location.query.duration,
      autoplay: this.props.location.query.video,
      hide_sensitive: (parseInt(this.props.location.query.hide_sensitive, 10) === 1? ' filter:safe':''),
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

  // deepSearch(obj, path){
  //   for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
  //       obj = obj[path[i]];
  //   };
  //   return obj;
  // };

  async getTweets() {
    try {
      let responseJson = {};
      const uri = encodeURI(`https://cloud.viewneo.com/social/twitter/search?q=${this.state.query}${this.state.hide_sensitive}`);
      let response = await fetch(uri, { mode: 'cors', cache: 'force-cache' });
      if (response.ok) {
        responseJson = await response.json();
      }

      return responseJson.statuses;
    } catch (error) {
      console.error(error);
    }
  }

  async componentWillMount() {
    const fetchedTweets = await this.getTweets();


    if (fetchedTweets) {
      console.log(this.state.quantity, fetchedTweets);
      fetchedTweets.splice(parseInt(this.state.quantity, 10));
      console.log(fetchedTweets);
      let tweets = fetchedTweets.map( (tweet) => {
        let media = false;
        let type = false;
        let sizes = {w: '', h: ''};

        if (tweet.entities.media) {
          if (tweet.extended_entities.media[0].type === 'photo') {
            type = 'photo';
            media = tweet.extended_entities.media[0].media_url;
          } else if (tweet.extended_entities.media[0].type === 'video') {
            type = 'video';
            //
            let maxbitrate = tweet.extended_entities.media[0].video_info.variants.reduce((max, x) => (x.bitrate > max) ? x.bitrate : max, 0);
            media = tweet.extended_entities.media[0].video_info.variants.find((x) => x.bitrate === maxbitrate).url;
            // sizes.w = tweet.extended_entities.media[0].sizes.large.w;
            // sizes.h = tweet.extended_entities.media[0].sizes.large.h;
          // } else if (this.deepSearch(tweet, 'youtu.be')) {
          //   console.log('yay!');
          //   type = 'youtube';
          //   media = tweet.entities.urls[0].display_url.split('/')[1];
          }
        }

        return {
          id: tweet.id,
          name: tweet.user.name,
          screen_name: tweet.user.screen_name,
          avatar: tweet.user.profile_image_url,
          // this regex only captures english characters
          // not latin. better than nothing for now.
          // here, have a look:
          // https://github.com/twitter/twitter-text/blob/master/js/twitter-text.js
          text: tweet.text.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>'),
          media: { type, url: media, sizes }
        };
      });

      this.setState( { tweets } );
    } else {
      this.setState( { tweets: [{id: 0, name: 'Failed to load API'}]});
    }
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
      if (parseInt(this.state.autoplay, 10) === 1) {
      media = <div className="media-wrapper"><video className="tweet-img" width="100%" height="100%" src={tweet.media.url} autoPlay loop></video></div>;
      } else {
      media = <div className="media-wrapper"><video className="tweet-img" width="100%" height="100%" src={tweet.media.url} loop></video></div>;
    }
    // } else if (tweet.media && tweet.media.type === "youtube") {
    //   media = <div className="media-wrapper"><video className="tweet-img" width="100%" height="100%" src={tweet.media.url} {autoplay} loop></video></div>;
    }

    const text = {__html:tweet.text};

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

              <div className="text" dangerouslySetInnerHTML={text}></div>
            </div>

            {media}
          </div>
        </div>

      </div>
    );
  }
}

export default Tweet;
