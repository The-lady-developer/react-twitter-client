import React, { Component } from 'react';

import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 10,
      query: 'viewneo1',
      duration: 30,
      autoplay: 1,
      hide_sensitive: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    switch (event.target.name) {
      case "query":
        this.setState({query: event.target.value});
        break;
      case "quantity":
        this.setState({quantity: event.target.value});
        break;
      case "duration":
        this.setState({duration: event.target.value});
        break;
      case "autoplay":
        this.setState({autoplay: +event.target.checked});
        break;
      case "hide_sensitive":
        this.setState({hide_sensitive: +event.target.checked});
        break;
      default:
    }
  }

  handleSubmit(e) {
    e.stopPropagation();
    const { router } = this.props;
    router.push({
      pathname: 'tweet',
      query: {
        q: this.state.query,
        quantity: this.state.quantity,
        duration: this.state.duration,
        hide_sensitive: this.state.hide_sensitive,
        video: this.state.autoplay
      }
    });
  }

  render() {
    return (
      <div className="Dashboard">
        <p>
          Search Query: <input type="text"
            placeholder="Query"
            defaultValue={this.state.query}
            name="query"
            onChange={this.handleChange} /><br />

          Number of Tweets: <input type="range"
            placeholder="10"
            defaultValue={this.state.quantity}
            min="1" max="15"
            name="quantity"
            onChange={this.handleChange} /> {this.state.quantity}<br />

          Duration: <input type="number"
            placeholder="30"
            defaultValue={this.state.duration}
            name="duration"
            onChange={this.handleChange} /><br />

          <input type="checkbox"
            defaultChecked={true}
            name="autoplay"
            id="autoplay"
            onChange={this.handleChange} />
          <label htmlFor="autoplay">Video Autoplay</label><br />

          <input type="checkbox"
            defaultChecked={true}
            name="hide_sensitive"
            id="hide_sensitive"
            onChange={this.handleChange} />
          <label htmlFor="hide_sensitive">Filter Sensitive Content</label><br />

          <button onClick={this.handleSubmit}>
            Submit
          </button>
        </p>
      </div>
    );
  }
}

export default Dashboard;
