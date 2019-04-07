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
      page: 0,
      rowsPerPage: 5,
    };
    //this.userProfile = props.myState.userProfile.registerCallback(this);
    //console.log("I have constructed the table");

    //this.handleClick = this.handleClick.bind(this);
  }
    

    handleClick(ticket, index) {
      //console.log("Clicked " + ticket.objectId);

      if (this.state.delete) {
        this.setState({
          delete: false
        })
      }
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
            //"X-Parse-Session-Token": sessionToken,
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
        console.log("REaced");
        return <Redirect to={{
          pathname: `/Ticket/` + this.state.ticketIndex,
          // state: { id: this.state.ticketID, ticket: this.state.ticketState, myState: this.userProfile.value }
          state: { id: this.state.ticketID, ticket: this.state.ticketState}
        }} push={true}></Redirect>;
      }
    }
  
    handleChangePage = (event, page) => {
      this.setState({ page });
    };
  
    handleChangeRowsPerPage = event => {
      this.state.ticketIndex = 0;
      this.setState({ rowsPerPage: event.target.value });
    };
  
    //isSelected = id => this.state.selected.indexOf(id) !== -1;
  
    render() {
      const { classes } = this.props;
      const { tickets,rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, tickets.length - page * rowsPerPage);
        
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
                    this.state.ticketIndex = (this.state.ticketIndex + 1 ) % tickets.length;
                    if (this.state.ticketIndex === 0) {
                      this.state.ticketIndex = tickets.length;
                    }
                    return (
                      <TableRow
                        key={ticket.objectId}
                        hover onClick={this.handleClick.bind(this, ticket, this.state.ticketIndex )}
                      >
                        <TableCell >
                          {this.state.ticketIndex}
                        </TableCell>
                        <TableCell align="left">{ticket.title}</TableCell>
                        <TableCell align="left">{ticket.category}</TableCell>
                        <TableCell align="left">{ticket.status}</TableCell>
                        <TableCell align="left">{ticket.objectId}</TableCell>
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
          {/* <TablePagination
            rowsPerPageOptions={[tickets.length,5, 10]}
            component="div"
            count={tickets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          /> */}
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