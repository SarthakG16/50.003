import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import LastPageIcon from '@material-ui/icons/LastPage';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import constants from "../../resources/strings.js";

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { parseMessage } from '../../resources/fileDownload.js';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import { fade } from '@material-ui/core/styles/colorManipulator';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {



    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          id="NextPageButton"
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

var index = 0;
var ticketindex = 0;
var lastOrigin = "";


class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      delete: false,

      ticketID: -1, //I think this is redundant/
      ticketState: null,
      ticketIndex: 0,

      tickets: this.props.tickets,
      filterTickets: this.props.tickets,

      search: '',

      page: 0,
      rowsPerPage: 5,
      open: false,
      value: 'All'
    };
    this.changingpage = false;
    this.userProfile = props.myState.userProfile.registerCallback(this);
    // this.userProfile = props.myState;
    this.isAdmin = props.isAdmin;
    this.origin = props.origin;

    this.flag = false;
    console.log("I have constructed the table");
    console.log(this.origin)

    //this.handleClick = this.handleClick.bind(this);
  }

  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    // console.log(value)
    var newlist;
    if (value === 'All') {
      newlist = this.props.tickets.filter(ticket => { return ticket.title.toLowerCase().includes(this.state.search.toLowerCase()) })
      this.setState({ value, open: false, filterTickets: newlist });
    } else {
      newlist = this.props.tickets.filter(ticket => { return ticket.category === value && ticket.title.toLowerCase().includes(this.state.search.toLowerCase()) })
      this.setState({ value, open: false, filterTickets: newlist });
    }
  };


  handleClick(ticket, index) {
    if (this.flag) {
      // console.log("UHM");
      this.flag = false;
      return;
    }
    // console.log("Clicked " + ticket.objectId);

    this.setState({
      redirect: true,
      ticketID: ticket.objectId,
      ticketState: ticket,
      ticketIndex: index
    });
  }

  handleDelete(ticket) {
    const sessionToken = localStorage.getItem("sessionToken");
    console.log("DELETING TICKET " + ticket.objectId);
    this.setState({
      delete: true
    })

    var settings;

    if (window.confirm('Are you sure you want to delete the ticket: ' + ticket.title)) {
      if (this.origin === "Archive" && this.isAdmin) {
        settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets/" + ticket.objectId,
          "method": "DELETE",
          "headers": {
            "Content-Type": "application/json",
            "Server-Token": constants.serverToken,
            "X-Parse-Session-Token": sessionToken,
            "cache-control": "no-cache",
          },
          "processData": false,
          "data": ""
        }

        $.ajax(settings).done(function (response) {
          console.log("ticket deleted succesfully");
          window.location.reload();
        });
      }
      else if (this.origin === "Archive" && !this.isAdmin) {
        settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets/" + ticket.objectId,
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json",
            "Server-Token": constants.serverToken,
            "cache-control": "no-cache",
            "X-Parse-Session-Token": sessionToken,
          },
          "processData": false,
          "data": "{\n\t\n\t\"status\": \"Deleted\"\n}"
        }

        $.ajax(settings).done(function (response) {
          console.log("ticket deleted succesfully");
          window.location.reload();
        });

      }
      else {
        settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets/" + ticket.objectId,
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json",
            "Server-Token": constants.serverToken,
            "cache-control": "no-cache",
            "X-Parse-Session-Token": sessionToken,
          },
          "processData": false,
          "data": "{\n\t\n\t\"status\": \"Archive\"\n}"
        }

        $.ajax(settings).done(function (response) {
          console.log("ticket deleted succesfully");
          window.location.reload();
        });
      }
    }
    this.setState({
      delete: false,
      redirect: false,
    });

    this.flag = true;
  }

  handleSeenTicket() {
    const sessionToken = localStorage.getItem("sessionToken");
    var settings;
    if (this.isAdmin) {
      if (this.state.ticketState.adminNew === false) { return true; }
      settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets/" + this.state.ticketState.objectId,
        "method": "PUT",
        "headers": {
          "Content-Type": "application/json",
          "Server-Token": constants.serverToken,
          "cache-control": "no-cache",
          "X-Parse-Session-Token": sessionToken,
        },
        "processData": false,
        "data": "{\n\t\"adminNew\":false\n}"
      }

      $.ajax(settings).done(function (response) {
        console.log("ticket updated");
      });
    } else {
      if (this.state.ticketState.userNew === false) { return true; }
      settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets/" + this.state.ticketState.objectId,
        "method": "PUT",
        "headers": {
          "Content-Type": "application/json",
          "Server-Token": constants.serverToken,
          "cache-control": "no-cache",
          "X-Parse-Session-Token": sessionToken,
        },
        "processData": false,
        "data": "{\n\t\"userNew\":false\n}"
      }

      $.ajax(settings).done(function (response) {
        console.log("ticket updated");
      });

    }

  }

  handleSearch(event) {
    console.log(event.target.value);
    var newtickets;

    if (this.state.value === 'All') {
      newtickets = this.props.tickets.filter(ticket => { return ticket.title.toLowerCase().includes(event.target.value.toLowerCase()) })
      this.setState({ search: event.target.value, filterTickets: newtickets })
    } else {
      newtickets = this.props.tickets.filter(ticket => { return ticket.title.toLowerCase().includes(event.target.value.toLowerCase()) && ticket.category === this.state.value })
      this.setState({ search: event.target.value, filterTickets: newtickets })

    }

  }


  renderRedirect() {
    if (this.state.redirect && !this.state.delete) {
      ticketindex = this.state.ticketIndex;
      lastOrigin = this.origin;
      this.handleSeenTicket();
      localStorage.setItem(
        "myState",
        JSON.stringify(
          { id: this.state.ticketID, ticket: this.state.ticketState, myState: this.userProfile.value, isAdmin: this.isAdmin }
        ),
      )
      return <Redirect to={{
        pathname: `/Ticket/` + this.state.ticketIndex,
        // state: { id: this.state.ticketID, ticket: this.state.ticketState, myState: this.userProfile.value, isAdmin: this.isAdmin }
      }} push={true}></Redirect>;
    }
  }

  handleChangePage = (event, page) => {
    // console.log(page);  
    index = (this.state.rowsPerPage + 1) * page;
    this.changingpage = true;
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    // this.setState({
    //   ticketIndex: 0
    // });
    index = 0; //added to reset index to 0
    var number = 0;
    number = event.target.value;
    this.setState({ rowsPerPage: number });
  };


  render() {
    console.log(this.userProfile.value);
    console.log(this.origin)
    const { classes } = this.props;
    const { filterTickets, tickets, rowsPerPage } = this.state;
    var page = this.state.page;

    if (!(lastOrigin === this.origin)) {
      ticketindex = 0;
    }

    // console.log(ticketindex);
    if (index < rowsPerPage) {
      page = 0;
    }
    else if (!this.changingpage) {
      page = Math.max(Math.floor((ticketindex - 1) / rowsPerPage), 0);
    }
    index = page * rowsPerPage;

    var header = "Your Tickets";
    if (this.origin === "Archive") {
      header = "Archived Tickets"
    }
    // console.log(index,page,rowsPerPage);

    return (

      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <h4 align="center">{header}</h4>
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by Ticket Title..."
                onChange={this.handleSearch.bind(this)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
          <Table className={classes.table} aria-labelledby="tableTitle">
            {this.renderRedirect()}
            <TableHead>
              <TableRow>
                <TableCell><h4>Index</h4></TableCell>
                <TableCell align="left"><h4>Title</h4></TableCell>
                <TableCell align="left" onClick={this.handleClickListItem}><Button style={{ textTransform: 'capitalize' }} color="primary">Category <ArrowDropDown /></Button></TableCell>
                <TableCell align="left"><h4>Status</h4></TableCell>
                <TableCell align="left"><h4>Last Message</h4></TableCell>
                <TableCell align="left"><h4>New</h4></TableCell>
                <TableCell align="left"><h4>Action</h4></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.filterTickets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(ticket => {
                  if (this.state.redirect) {
                    return true;
                  }
                  if (!(this.state.value === "All") && this.state.value !== ticket.category) {
                    return true;
                  }

                  index = (index + 1) % tickets.length;
                  if (index === 0) {
                    index = tickets.length;
                  }

                  var color = 'blue';
                  if (ticket.status === "Pending") {
                    color = 'green';
                  } else if (ticket.status === "Archive") {
                    color = 'grey'
                  } else if (ticket.status === 'Closed') {
                    color = 'red'
                  }

                  var message = ticket.replies[ticket.replies.length - 1].message;
                  message = parseMessage(message, true);
                  if (message.length > 15) {
                    message = message.substr(0, 15) + "...";
                  }

                  var title = ticket.title;
                  if (title.length > 15) {
                    title = title.substr(0, 15) + "..."
                  }

                  var newmessage = "Seen";
                  if (this.isAdmin && ticket.adminNew) {
                    newmessage = "NEW"
                  } else if (!this.isAdmin && ticket.userNew) {
                    newmessage = "NEW"
                  }

                  return (
                    <TableRow
                      key={ticket.objectId}
                      hover onClick={this.handleClick.bind(this, ticket, index)}
                    >
                      <TableCell >
                        {index}
                      </TableCell>
                      <TableCell align="left" name="ticketTitle">{title}</TableCell>
                      <TableCell align="left" name="ticketCategory">{ticket.category}</TableCell>
                      <TableCell align="left" name="ticketStatus">{<p style={{ color: color }}>{ticket.status}</p>}</TableCell>
                      <TableCell align="left" name="ticketMessage">{message}</TableCell>
                      <TableCell align="left">{<p style={{ color: newmessage === "NEW" ? 'blue' : 'grey' }}>{newmessage}</p>}</TableCell>
                      <TableCell align="left"> <Tooltip title="Delete">
                        <IconButton id = "Delete" align="left" onClick={this.handleDelete.bind(this, ticket)}>
                          <DeleteIcon size="20" />
                        </IconButton>
                      </Tooltip></TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={5}
                  count={filterTickets.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <ConfirmationDialogRaw
          classes={{
            paper: classes.paper,
          }}
          open={this.state.open}
          onClose={this.handleClose}
          value={this.state.value}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  tickets: PropTypes.array.isRequired,
};


const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit *3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 1020,
    },
  },
});
export default withStyles(styles)(EnhancedTable);




const options = [
  "All",
  "ACNAPI MFA Login",
  "Aesop",
  "AI Translator",
  "AI Wealth Manager",
  "API DevOps",
  "AR Car Manual",
  "AR Car Visualizer",
  "AR Gamification",
  "AR Menu",
  "AR Theatre",
  "Banking Lifestyle App",
  "Chart as a Service",
  "Digital Butler",
  "IoT Led Wall",
  "Queuing System",
  "Recruitment Platform",
  "Sentiments Analysis",
  "Smart Home",
  "Smart Lock",
  "Smart Parking",
  "Smart Restaurant",
  "Ticketing Platform",
  "Travel Marketplace",
  "Video Analytics",
  "Other"
];

class ConfirmationDialogRaw extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
    };
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleEntering = () => {
    this.radioGroupRef.focus();
  };

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  handleOk = () => {
    this.props.onClose(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">Categories Shown</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={ref => {
              this.radioGroupRef = ref;
            }}
            aria-label="Category"
            name="category"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
            </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};
