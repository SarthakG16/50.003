import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountBoxIcon from "@material-ui/icons/AccountBox"

import constants from "../resources/strings";

// TODO
import { Link } from 'react-router-dom';

const linkStyle = {
	color: '#fff',
  textDecoration: 'none',
  marginLeft: -12,
  marginRight: 20,
}
//

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MyAppbar extends React.Component {
  constructor(props) {
    super(props);
    this.userProfile = props.myState.userProfile.registerCallback(this);
  }

  handleClick = (event) => {
    event.preventDefault();

    const {userProfile, myWelcomeDialog} = this.props.myState;

    const sessionToken = localStorage.getItem("sessionToken");

    var data = null;

    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {        
        userProfile.value = { };
        myWelcomeDialog.value = Object.assign(myWelcomeDialog.value, { open: true });

        localStorage.clear();
        console.log("Logging Out")
      }
    });

    xhr.open("POST", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/logout");
    xhr.setRequestHeader("Server-Token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw");
    xhr.setRequestHeader("X-Parse-Session-Token", sessionToken);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
  }

  render() {
    const { classes } = this.props;

    const username = this.userProfile.value.username;
    
    return (
      <AppBar >
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleClick}>
            <AccountBoxIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>{constants.title}</Typography>
          <Link style={linkStyle} to={{ pathname: "/", user: this.userProfile.value}}>Tickets</Link>
          <Link style={linkStyle} to={{ pathname: "/NewTicket", user: this.userProfile.value}}>New Ticket</Link>
          <Link style={linkStyle} to="/Archive">Archive</Link>
          <Typography variant="h6" color="inherit" className={classes.grow}></Typography>
          <Typography variant="subtitle2" color="inherit">WELCOME {username}</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

MyAppbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyAppbar);