import React, { Component } from 'react';
import './App.css';
import { withRouter } from "react-router-dom";
import Routes from "./Routes"
import Header from './components/layout/Header';

import MyState from "./components/MyState";
import { withStyles } from "@material-ui/core/styles";
//import MyAppbar from "./components/MyAppbar"
import MySnackbar from "./components/MySnackbar"

import MyWelcomeDialog from "./components/MyWelcomeDialog"


const styles = (theme) => ({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  toolbar: theme.mixins.toolbar,
});

class App extends Component {
  constructor(props) {
    super(props);

    this.myState = {
      userProfile: new MyState({ }),

      myWelcomeDialog: new MyState({ open: false }),
      mySnackbar: new MyState({ open: false, variant: "info", message: "" }),
    };
  }

  render() {
    const { classes } = this.props;
    const myWelcomeDialog = this.myState.myWelcomeDialog;

    return (
      <div className={classes.root}>
        {/* <MyAppbar myState={this.myState} /> */}
        {/* <div className={classes.toolbar} /> */}
        <MySnackbar myState={this.myState} />
        <MyWelcomeDialog open={myWelcomeDialog.open} myState={this.myState} />
        <Header />
        <Routes />
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(App));
