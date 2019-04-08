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
import LastPageIcon from '@material-ui/icons/LastPage';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import constants from "../../resources/strings.js";

const sessionToken = localStorage.getItem("sessionToken");

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


class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      delete: false,
      idk: false,

      ticketID: -1, //I think this is redundant/
      ticketState: null,
      ticketIndex: 0,

      tickets: this.props.tickets,
      page: 0,
      rowsPerPage: 5,
    };
    this.userProfile = props.myState.userProfile.registerCallback(this);
    this.isAdmin = props.isAdmin;
    this.origin = props.origin;

    var flag = false;
    //console.log("I have constructed the table");

    //this.handleClick = this.handleClick.bind(this);
  }
    

    handleClick(ticket, index) {
      if (this.flag) {
        console.log("UHM");
        this.flag = false;
        return;
      }
      console.log("Clicked " + ticket.objectId);

      this.setState({
        redirect: true,
        ticketID: ticket.objectId,
        ticketState: ticket,
        ticketIndex: index
      });
    }
  
    handleDelete(ticket) {
      console.log("DELETING TICKET " + ticket.objectId);
      this.setState({
        delete: true
      })

      var settings;
  
      if (window.confirm('Are you sure you want to delete the ticket: ' + ticket.title)) {
        if (this.origin === "Archive" && this.isAdmin)  {
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
          delete : false,
          redirect:false,          
        });
        
        this.flag = true;
    }
  
    renderRedirect() {
      if (this.state.redirect && !this.state.delete) {
        return <Redirect to={{
          pathname: `/Ticket/` + this.state.ticketIndex,
          state: { id: this.state.ticketID, ticket: this.state.ticketState, myState: this.userProfile.value, isAdmin: this.isAdmin }
        }} push={true}></Redirect>;
      }
    }
  
    handleChangePage = (event, page) => {
      index = this.state.rowsPerPage;
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
  
    //isSelected = id => this.state.selected.indexOf(id) !== -1;
  
    render() {
      console.log(this.userProfile.value);
      const { classes } = this.props;
      const { tickets,rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, tickets.length - page * rowsPerPage);
      index = page* rowsPerPage;
      return (
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
            {this.renderRedirect()}
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Message</TableCell>
                <TableCell align="left"> </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
                {this.state.tickets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(ticket => {
                    index =  (index + 1) % tickets.length;
                    if (index === 0) {
                      index = tickets.length;
                    }
                    return (
                      <TableRow              
                        key={ticket.objectId}
                        hover onClick={this.handleClick.bind(this, ticket, index )}
                      >
                        <TableCell >
                          {index}
                        </TableCell>
                        <TableCell align="left">{ticket.title}</TableCell>
                        <TableCell align="left">{ticket.category}</TableCell>
                        <TableCell align="left">{ticket.status}</TableCell>
                        <TableCell align="left">{ticket.replies[ticket.replies.length - 1].message}</TableCell>
                        <TableCell padding = "none"> <Tooltip title="Delete" padding = "none">
                        <IconButton padding = "none" aria-label="Delete" onClick={this.handleDelete.bind(this, ticket)}>
                          <DeleteIcon size = "20"/>
                        </IconButton>
                      </Tooltip></TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={5}
                  count={tickets.length}
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
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  });
  export default withStyles(styles)(EnhancedTable);