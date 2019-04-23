import constants from "../resources/strings";

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArchiveIcon from '@material-ui/icons/Archive';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CreateIcon from '@material-ui/icons/Create';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Tooltip from '@material-ui/core/Tooltip';

import { Link } from 'react-router-dom';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  }
});

class MyAppbar extends React.Component {
  constructor(props) {
    super(props);

    this.userProfile = props.myState.userProfile.registerCallback(this);
    this.mySnackbar = props.myState.mySnackbar.registerCallback(this);
  }

  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClick = (event) => {
    event.preventDefault();

    const { userProfile, myWelcomeDialog, mySnackbar } = this.props.myState;

    const sessionToken = localStorage.getItem("sessionToken");

    var data = null;

    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (window.location.href !== "/") {
          window.location.href = "/";
        }
        else {
          userProfile.value = {};
          myWelcomeDialog.value = Object.assign(myWelcomeDialog.value, { open: true });
        }
        
        localStorage.clear();

        // mySnackbar.value = Object.assign(mySnackbar.value, { open: true, variant: "success", message: "You have successfully logged out. " });
      }
    });

    xhr.open("POST", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/logout");
    xhr.setRequestHeader("Server-Token", constants.serverToken);
    xhr.setRequestHeader("X-Parse-Session-Token", sessionToken);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

    // this.props.history.push('/');
    // alert("You have logged out successfully.")
    // return <Redirect to='/' push={true}></Redirect>
    // return;

  }

  render() {
    const { classes } = this.props;

    const username = this.userProfile.value.username;

    if (Object.entries(this.userProfile.value).length === 0 && this.userProfile.value.constructor === Object) {
      return null
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={true}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ paddingLeft: this.state.open ? 25 : 0 }}>
              <Typography align="left" variant="h6" color="inherit" noWrap>
                {constants.title}
              </Typography>
            </div>
            <Typography variant="h6" color="inherit" className={classes.grow}></Typography>
            <Typography align="right" style={{ marginRight: 12 }} variant="subtitle2" color="inherit">{"Welcome back " + username}</Typography>
            <Tooltip title="Logout">
              <IconButton
                id="logout"
                style={{ marginRight: 12 }}
                onClick={this.handleClick} variant="text" color="inherit"
              >
                <PowerSettingsNew />
              </IconButton>
            </Tooltip>
            {/* <PowerSettingsNew
              style={{ marginRight: 25 }}
              onClick={this.handleClick} variant="text" color="inherit"
            >
            </PowerSettingsNew> */}
            {/* <Button onClick={this.handleClick} variant="text" color="inherit">[LOGOUT]</Button> */}
          </Toolbar>
        </AppBar>
        {/* <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>{constants.title}</Typography>
            <Link style={linkStyle} to={{ pathname: "/", user: this.userProfile.value }}>Tickets</Link>
            <Link style={linkStyle} to={{ pathname: "/NewTicket", user: this.userProfile.value }}>New Ticket</Link>
            <Link style={linkStyle} to="/Archive">Archive</Link>
            <Typography variant="h6" color="inherit" className={classes.grow}></Typography>
            <Typography variant="subtitle2" color="inherit"><Button onClick={this.handleClick} variant="caption" color="inherit">[LOGOUT]</Button>{username}</Typography>
          </Toolbar>
        </AppBar> */}
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {<ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List style={{ marginLeft: 6 }}>
            {['All', 'Archive'].map((text, index) => (
              <div key={index}>
                {index % 2 === 0 ?
                  <Link to={{ pathname: "/", user: this.userProfile.value }}>
                    <ListItem button key={text}>
                      <ListItemIcon><AllInboxIcon /></ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link> :
                  <Link to="/Archive">
                    <ListItem button key={text}>
                      <ListItemIcon><ArchiveIcon /></ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                }
              </div>
            ))}
          </List>
          <Divider />
          <List style={{ marginLeft: 6 }}>
            <Link to={{ pathname: "/NewTicket", user: this.userProfile.value }}>
              <ListItem button key="New Ticket">
                <ListItemIcon><CreateIcon /></ListItemIcon>
                <ListItemText primary="New Ticket" />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        {/* <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes myState={this.props.myState} />
        </main> */}
      </div>
    );
  }
}

MyAppbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyAppbar);
