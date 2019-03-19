import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TicketMessages from './TicketMessages';
import uuid from 'uuid';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, MenuItem } from '@material-ui/core';
import $ from 'jquery';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        spacing: theme.spacing.unit * 2,
    },
});

/*
// This constant was to test the display of messages
const messagesTest = [
        { name: 'User1', message: 'I have a problem', date: ''},
        { name: 'Admin1', message: 'Okay solve your problem', date: ''}];
*/

// Values to be resetted to after the user has click a submit button and succeeded
const RESET_VALUES = {
    name: 'User1',
    message: '',
    date: ''
};

// values of status
const STATUS_VALUES = [
    {
      value: 'Pending',
      label: 'Pending',
    },
    {
      value: 'Open',
      label: 'Open',
    },
    {
      value: 'Closed',
      label: 'Closed',
    },
    {
      value: 'Achrive',
      label: 'Achrive',
    },
  ];
  

class TicketThread extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.addReply = this.addReply.bind(this);
        this.getDateCreated = this.getDateCreated.bind(this);
        this.state = {
            reply: Object.assign({}, RESET_VALUES),
            status: this.props.location.state.ticket.status
        };
    }

    // returns the date and time the reply was posted in UTC
    getDateCreated(){
        var today = new Date();
        console.log(today);
        return today.toUTCString();
    }

    // API call to update the ticket
    addReply(e) {
        // getting the ticket variables for PUT
        let objectId = this.props.location.state.ticket.objectId;
        var replies = this.props.location.state.ticket.replies;
        console.log(objectId);
        console.log(replies);

        // add the date
        e.date =  this.getDateCreated();
        console.log(e);

        // adding the new reply to the original
        replies.push(e);
        console.log(replies);
        let data = { "replies":replies};
        console.log(JSON.stringify(data));
        // console.log(JSON.stringify(replies));

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets/" + objectId,
            "method": "PUT",
            "headers": {
              "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
              "Content-Type": "application/json",
              "cache-control": "no-cache",
            },
            "processData": false,
            "data": JSON.stringify(data)
          }
          
          $.ajax(settings).done(function (response) {
            console.log("reply added succesfully");
          });
    
    }

    // handles event when submit button is clicked
    handleSubmit(e) {
        console.log('clicked submit');
        let ticketVaild = this.handleValidation(e);        
        console.log('finish checking');
        if (ticketVaild) {
            this.addReply(e);
            alert("Your reply has been posted.")
            // reset the form values to blank after submitting:
            this.setState({
                reply: Object.assign({}, RESET_VALUES),
            });
            
        }
        return;
    }

    // check if there are valid messages in the reply box
    handleValidation(e) {
        let reply = e;
        console.log(e);
        if (reply.message === '') {
            console.log('No messages');
            return false;
        }
        return true;
    }

    // reflect changes in the text box when the user is typing
    handleChange(e) {
        const value = e.target.value;
        const name = 'User1';

        this.setState((prevState) => {
            prevState.reply.message = value;
            prevState.reply.name = name;
            return { reply: prevState.reply };
        });
    }

    // updates the changes in status
    handleStatusChange(e){
        const value = e.target.value;

        let data = { "status":value};
        console.log(JSON.stringify(data));
        // console.log(JSON.stringify(replies));

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets/" + this.props.location.state.ticket.objectId,
            "method": "PUT",
            "headers": {
              "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
              "Content-Type": "application/json",
              "cache-control": "no-cache",
            },
            "processData": false,
            "data": JSON.stringify(data)
          }
          
          $.ajax(settings).done(function (response) {
            console.log("Status updated succesfully");
          }); 

        
        this.setState((prevState) => {
            prevState.status = value;
            return { status: prevState.status };
        });
    }

    render() {
        console.log('inside a thread');
        return (
            <React.Fragment>
                <div>
                    <Paper elevation={5}
                    width='80%'
                    style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Typography align="left" variant="subtitle1">
                            Ticket ID: {this.props.location.state.ticket.objectId}
                            <p />
                        </Typography>
                        <Typography align="left" variant="headline">
                            Title: {this.props.location.state.ticket.title}
                            <p />
                            </Typography>
                        <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={8}>
                            <Grid item xs={8}>
                                <Typography align="left" variant="caption">
                                    Timestamp: {this.props.location.state.ticket.createdAt} <br />
                                    Status: {this.state.status}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    id="change-status"
                                    select
                                    label="Change status"
                                    value={this.state.status}
                                    onChange={this.handleStatusChange}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    height='60px'
                                    InputLabelProps={{shrink: true,}}
                                    >
                                    {STATUS_VALUES.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        
                    </Paper>
                </div>
                <div>
                    <Typography align="left" variant="subtitle1">
                        <p>

                        </p>
                            Messages:<br />
                        <p>

                        </p>
                    </Typography>
                        <TicketMessages
                            key={uuid.u4}
                            messages={this.props.location.state.ticket.replies}>
                        </TicketMessages>
                </div>
                <div>
                        <TextField
                            id="outlined-full-width"
                            label="Reply"
                            name="Reply"
                            multiline
                            rowsMax="6"
                            type='text'
                            value={this.state.reply.message}
                            onChange={this.handleChange}
                            fullWidth
                            style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10, paddingRight:20}}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{shrink: true,}}
                            // required="required"
                            />
                        <Button
                            variant="contained"
                            onClick={this.handleSubmit.bind(this, this.state.reply)}
                            >
                            Submit
                          </Button>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TicketThread);
// TicketThread.propTypes = {
//     ticket: PropTypes.object.isRequired
// }