import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';



class SimpleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            ticketID: -1,
            ticketState: null
        }

        //this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ticket) {
        console.log("Clicked " + ticket.id);
        this.setState({
            redirect: true,
            ticketID: ticket.id,
            ticketState: ticket
        });
    }

    renderRedirect() {
        if (this.state.redirect) {
            console.log('redirecting');
            return <Redirect to={{pathname:`/Ticket/`+ this.state.ticketID, 
            state: {id:this.state.ticketID, ticket: this.state.ticketState}}} push={true}></Redirect>;
        }
    }

    render() {
  const { tickets } = this.props;
  return (
    <Paper className={'whatever'}>
      <Table className={'Table'}>
      {this.renderRedirect()}
        <TableHead>
          <TableRow>
            <TableCell>Ticket ID</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map(ticket => (
            //<TableRow key={ticket.id} hover onClick={(e)=> {this.handleClick()}}>
            <TableRow key = {ticket.id} hover onClick={this.handleClick.bind(this, ticket)}>
              <TableCell component="th" scope="row">
                {ticket.id}
              </TableCell>
              <TableCell align="left">{ticket.title}</TableCell>
              <TableCell align="left">{ticket.category}</TableCell>
              <TableCell align="left">{ticket.status}</TableCell>
              <TableCell align="left">{ticket.message}</TableCell>
            </TableRow>
          ))}
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

