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
      <div className="container Dashboard">
        <div className="well">
          <h1>Welcome to Tweet dashboard</h1>
        </div>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-xs-3" htmlFor="query">Search Query:</label>
            <div className="col-xs-8">
              <input type="text"
                placeholder="Query"
                defaultValue={this.state.query}
                name="query"
                id="query"
                className="form-control"
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-xs-3" htmlFor="quantity">Number of Tweets:</label>
            <div className="col-xs-7">
              <input type="range"
                placeholder="10"
                defaultValue={this.state.quantity}
                min="1" max="15"
                name="quantity"
                id="quantity"
                className="form-control"
                onChange={this.handleChange} />
            </div>
            <div className="col-xs-1">
              {this.state.quantity}
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-xs-3" htmlFor="duration">Duration:</label>
            <div className="col-xs-8">
              <input type="number"
                placeholder="30"
                defaultValue={this.state.duration}
                name="duration"
                id="duration"
                className="form-control"
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <div className="col-xs-offset-3 col-xs-8 text-left">
              <div className="checkbox">
                <label>
                  <input type="checkbox"
                    defaultChecked={true}
                    name="autoplay"
                    id="autoplay"
                    onChange={this.handleChange} /> Video Autoplay
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-xs-offset-3 col-xs-8 text-left">
              <div className="checkbox">
                <label>
                  <input type="checkbox"
                    defaultChecked={true}
                    name="hide_sensitive"
                    id="hide_sensitive"
                    onChange={this.handleChange} /> Filter Sensitive Content
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-xs-offset-3 col-xs-8">
              <button onClick={this.handleSubmit} type="submit" className="btn btn-default">Sign in</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
