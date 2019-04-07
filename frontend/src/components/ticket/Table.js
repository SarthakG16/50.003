import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import constants from "../../resources/strings.js";

const sessionToken = localStorage.getItem("sessionToken");

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      delete: false,
      ticketID: -1,
      ticketState: null,
      ticketIndex: 0,
    }
    this.userProfile = props.myState.userProfile.registerCallback(this);
    console.log("I have constructed the table");

    //this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ticket, index) {
    // console.log("Clicked " + ticket.objectId);
    if (this.state.delete) {
      this.setState({
        delete: false
      })
    }
    this.setState({
      redirect: true,
      ticketID: ticket.id,
      ticketState: ticket,
      ticketIndex: index
    });
  }

  handleDelete(ticket) {
    console.log("DELETING TICKET " + ticket.objectId);
    this.setState({
      delete: true
    })

    if (window.confirm('Are you sure you want to delete the ticket: ' + ticket.title)) {
      
      var settings = {
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

  renderRedirect() {
    if (this.state.redirect && !this.state.delete) {
      return <Redirect to={{
        pathname: `/Ticket/` + this.state.ticketIndex,
        state: { id: this.state.ticketID, ticket: this.state.ticketState, myState: this.userProfile.value }
      }} push={true}></Redirect>;
    }
  }

  render() {
    const { tickets } = this.props;
    var index = 0;
    // console.log(this.userProfile.value);
    return (
        <Paper className={'whatever'}>
          <Table className={'Table'}>
            {this.renderRedirect()}
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map(ticket => {
                index += 1;
                if (ticket.status !== "Archive") {
                  return (
                    //<TableRow key={ticket.id} hover onClick={(e)=> {this.handleClick()}}>
                    <TableRow key={ticket.objectId} hover onClick={this.handleClick.bind(this, ticket, index)}>
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell align="left">{ticket.title}</TableCell>
                      <TableCell align="left">{ticket.category}</TableCell>
                      <TableCell align="left">{ticket.status}</TableCell>
                      <TableCell align="left">{ticket.replies[ticket.replies.length - 1].message}</TableCell>
                      <TableCell align="left"> <Tooltip title="Delete">
                        <IconButton aria-label="Delete" onClick={this.handleDelete.bind(this, ticket)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip></TableCell>
                    </TableRow>
                  );
                } else {
                  return (
                    //<TableRow key={ticket.id} hover onClick={(e)=> {this.handleClick()}}>
                    <TableRow key={ticket.objectId} hover onClick={this.handleClick.bind(this, ticket, index)}>
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell align="left">{ticket.title}</TableCell>
                      <TableCell align="left">{ticket.category}</TableCell>
                      <TableCell align="left">{ticket.status}</TableCell>
                      <TableCell align="left">{ticket.replies[ticket.replies.length - 1].message}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </Paper>
    );
  }
}


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


export default withStyles(styles)(SimpleTable);

SimpleTable.propTypes = {
  tickets: PropTypes.array.isRequired
}

