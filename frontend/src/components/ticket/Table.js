import React from 'react';
//import PropTypes from 'prop-types';
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



class SimpleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            delete: false,
            ticketID: -1,
            ticketState: null
        }

        //this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ticket) {
        console.log("Clicked " + ticket.objectId);
        if (this.state.delete) {
          this.setState({
            delete: false
          })
        }
        this.setState({
            redirect: true,
            ticketID: ticket.id,
            ticketState: ticket
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
          "method": "DELETE",
          "headers": {
            "Content-Type": "application/json",
            "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
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
    
    }



    renderRedirect() {
        if (this.state.redirect && !this.state.delete) {
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
            <TableRow key = {ticket.objectId} hover onClick={this.handleClick.bind(this, ticket)}>
              <TableCell component="th" scope="row">
                {ticket.objectId}
              </TableCell>
              <TableCell align="left">{ticket.title}</TableCell>
              <TableCell align="left">{ticket.category}</TableCell>
              <TableCell align="left">{ticket.status}</TableCell>
              {/* <TableCell align="left">{ticket.message}</TableCell> */}
              <TableCell align="left">{ticket.replies[ticket.replies.length-1].message}</TableCell>
              <TableCell align="left"> <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick = {this.handleDelete.bind(this,ticket)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip></TableCell>
              
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

