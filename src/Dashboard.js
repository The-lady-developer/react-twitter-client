import React, { Component } from 'react';

import logo from './logo.svg';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'viewneo1',
      duration: 30,
      autoplay: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    switch (event.target.name) {
      case "query":
        this.setState({query: event.target.value});
        break;  
      case "duration":
        this.setState({duration: event.target.value});
        break;
      default:
      case "autoplay":
        this.setState({autoplay: +event.target.checked});
    }
  }

  handleSubmit(e) {
    e.stopPropagation();
    const { router } = this.props;
    router.push({
      pathname: 'tweet',
      query: {
        q: this.state.query,
        duration: this.state.duration,
        video: this.state.autoplay
      }
    });
  }
  
  render() {
    return (
      <div className="Dashboard">
        <div className="Dashboard-header">
          <img src={logo} className="Dashboard-logo" alt="logo" />
          <h2>Dashboard</h2>
        </div>
        
        <p>
          Search Query: <input type="text"
            placeholder="Query"
            value={this.state.query}
            name="query"
            onChange={this.handleChange} /><br />

          Duration: <input type="number"
            placeholder="30"
            value={this.state.duration}
            name="duration"
            onChange={this.handleChange} /><br />

          <input type="checkbox"
            defaultChecked={false}
            name="autoplay"
            id="autoplay"
            onChange={this.handleChange} />
          <label htmlFor="autoplay">Video Autoplay</label><br />

          <button onClick={this.handleSubmit}>
            Submit
          </button>
        </p>
      </div>
    );
  }
}

export default Dashboard;
