import React, { Component } from 'react';
import { Router, browserHistory } from "react-router-dom";
import './App.css';
import { withRouter } from "react-router-dom";
import Routes from "./Routes"
import Header from './components/layout/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
