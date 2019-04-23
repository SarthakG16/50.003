import React from 'react';
//import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TicketMessages from './TicketMessages';
import uuid from 'uuid';
import { Button, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import $ from 'jquery';
import constants from "../../resources/strings.js";
import MyFileInput from '../MyFileInput';
import { appendFileToMessage } from '../../resources/fileUpload';

const sessionToken = localStorage.getItem("sessionToken");

// const styles = theme => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: 'auto',
//         paddingTop: theme.spacing.unit * 2,
//         paddingBottom: theme.spacing.unit * 2,
//         spacing: theme.spacing.unit * 2,
//     },
// });

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
    // {
    //     value: 'Archive',
    //     label: 'Archive',
    // },
];


export default class TicketThread extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.addReply = this.addReply.bind(this);
        this.getDateCreated = this.getDateCreated.bind(this);
        this.myState = JSON.parse(localStorage.getItem("myState"));
        this.userProfile = this.myState.myState;
        this.maxMessageChars = 1000;
        this.state = {
            reply: Object.assign({}, RESET_VALUES),
            status: this.myState.ticket.status,
            disable: ((this.myState.ticket.status === "Archive") ? true : false),
            isUser: !this.myState.isAdmin,
            messageCharsLeft: this.maxMessageChars,
            // userProfile: this.myState.myState.userProfile.registerCallback(this)
        };
        // console.log(this.userProfile.className);
        // console.log("I have constructed ticketthread");
        // console.log(this.myState.ticket.replies[0]);
    }

    // returns the date and time the reply was posted in UTC
    getDateCreated() {
        var today = new Date();
        // console.log(today);
        return today.toUTCString();
    }

    // API call to update the ticket
    async addReply(e) {
        // getting the ticket variables for PUT
        let objectId = this.myState.ticket.objectId;
        var replies = this.myState.ticket.replies;
        // console.log(objectId);
        // console.log(replies);

        // add the date
        e.date = this.getDateCreated();
        console.log(e);
        
        const reply = JSON.parse(JSON.stringify(e));
        reply.message = await appendFileToMessage(reply.message);

        // adding the new reply to the original
        replies.push(reply);
        console.log(replies);

        if (this.myState.isAdmin) { this.myState.ticket.replyCount = 0; }
        else { this.myState.ticket.replyCount++; }
            
        let data = { 
            "status": (this.state.isUser) ? 'Open' : 'Pending',
            "replyCount": this.myState.ticket.replyCount,
            "replies": replies
        };
        if (this.state.isUser) {
            data = { 
                "status": (this.state.isUser) ? 'Open' : 'Pending',
                "replyCount": this.myState.ticket.replyCount,
                "replies": replies,
                "adminNew": true                
            };
        } else {
            data = { 
                "status": (this.state.isUser) ? 'Open' : 'Pending',
                "replyCount": this.myState.ticket.replyCount,
                "replies": replies,
                "userNew": true                
            };
        }
        // console.log(JSON.stringify(data));
        // console.log(JSON.stringify(replies));

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets/" + objectId,
            "method": "PUT",
            "headers": {
                "Server-Token": constants.serverToken,
                "Content-Type": "application/json",
                "cache-control": "no-cache",
                "X-Parse-Session-Token": sessionToken,
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        $.ajax(settings).done(function (response) {
            alert("Your reply has been posted.")
            console.log("reply added succesfully");
        });
    }

    sendNotif(e) {
        let emailBody = {
            "subject": "Reply received",
            "sender": "Accenture@do-not-reply.com",
            "recipient": this.myState.ticket.email,
            "html": "<p>Hello " + this.myState.ticket.replies[0].name + ",</p><p>An admin has replied to your ticket: <em>'" + e.message + "'</em> on " + e.date + ".</p><p>-Ticket details-<br />Title: " + this.myState.ticket.title + "<br />Category: " + this.myState.ticket.category + "<br />Date/time of submission: " + this.myState.ticket.replies[0].date + "<br />Original message: " + this.myState.ticket.replies[0].message
        }
        // console.log(emailBody);
        console.log(JSON.stringify(emailBody));

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + "https://ug-api.acnapiv3.io/swivel/email-services/api/mailer",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Server-Token": constants.serverToken,
                    "cache-control": "no-cache"
                },
                body: JSON.stringify(emailBody)
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    // handles event when submit button is clicked
    async handleSubmit(e) {
        console.log('clicked submit');
        let ticketValid = this.handleValidation(e);
        // console.log('finish checking');
        if (ticketValid) {
            if (this.myState.ticket.replyCount < 3 || this.myState.isAdmin) {
                if (this.state.messageCharsLeft < 0) {
                    alert("Message character count is too high, please shorten your message.");
                }
                else {
                    await this.addReply(e);
                    //email notification
                    if (this.myState.isAdmin) this.sendNotif(e);
                    // reset the form values to blank after submitting:
                    this.setState({
                        reply: Object.assign({}, RESET_VALUES),
                    });
                 }
            }
            else {
                alert("You have exceeded your reply limit. Please wait for an admin to reply.");
            }
        }
        else {
            // console.log('No messages. Not posted');
            // alert("Your reply has been posted.")
        }
        return;
    }

    // check if there are valid messages in the reply box
    handleValidation(e) {
        let reply = e;
        console.log(e);
        if (reply.message === '') {
            // console.log('No messages');
            alert("Message cannot be empty. Please type something.")
            return false;
        }
        if (e.message.toString().includes("<") || e.message.toString().includes(">")) {
            alert("Message contains illegal characters (<, >). ");
            return false;
        }
        return true;
    }

    // reflect changes in the text box when the user is typing
    handleChange(e) {
        const value = e.target.value;
        const name = this.userProfile.username;
        // console.log(name + " is typing ");

        this.setState({
            messageCharsLeft: this.maxMessageChars - value.length,
        });

        this.setState((prevState) => {
            prevState.reply.message = value;
            prevState.reply.name = name;
            return { reply: prevState.reply };
        });
    }

    // updates the changes in status
    handleStatusChange(e) {
        const value = e.target.value;

        let data = { "status": value };
        console.log(JSON.stringify(data));
        // console.log(JSON.stringify(replies));

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets/" + this.myState.ticket.objectId,
            "method": "PUT",
            "headers": {
                "Server-Token": constants.serverToken,
                "Content-Type": "application/json",
                "cache-control": "no-cache",
                "X-Parse-Session-Token": sessionToken,
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
        // console.log('inside a thread');
        // console.log(this.userProfile);
        // console.log(this.state.disable);
        return (
            <React.Fragment>
                <div>
                    <Paper elevation={5}
                        width='80%' 
                        style={{ paddingLeft: 20, paddingRight: 20, paddingTop:10, paddingBottom:10 }}>
                        <Grid container direction="row" justify="space-between" alignItems="baseline" spacing={8}>
                        <Grid item xs>
                        <Grid container direction="row" justify="flex-start" alignItems="baseline" spacing={4}>
                                    <Grid item xs= {1.5}>
                                    <Typography align="left" variant="subtitle2" >
                                        <h3>Title:  </h3>
                                        <p />
                                    </Typography>
                                    </Grid>
                                    <Grid item xs>
                                    <Typography style = {{paddingLeft:10}} align="left" variant="subtitle2" >
                                        {this.myState.ticket.title}
                                    </Typography>
                                    </Grid>
                        </Grid>
                        </Grid>
                        <Grid item xs>
                        <Grid container direction="row" justify="flex-start" alignItems="baseline" spacing={4}>
                                    <Grid item xs= {1.5}>
                                    <Typography align="left" variant="subtitle2" >
                                        <h4>Ticket ID:  </h4>
                                        <p />
                                    </Typography>
                                    </Grid>
                                    <Grid item xs>
                                    <Typography style = {{paddingLeft:10}} align="left" variant="subtitle2" >
                                        {this.myState.ticket.objectId}
                                    </Typography>
                                    </Grid>
                        </Grid>
                        </Grid>
                        </Grid>
                        <Grid container direction="row" justify="space-between" alignItems="baseline" spacing={8}>
                            <Grid item xs>
                                <Grid container direction="row" justify="flex-start" alignItems="baseline" spacing={4}>
                                    <Grid item xs= {1.5}>
                                    <Typography align="left" variant="subtitle2" >
                                        <h4>Ticket Created:  </h4>
                                        <p />
                                    </Typography>
                                    </Grid>
                                    <Grid item xs>
                                    <Typography style = {{paddingLeft:10}} align="left" variant="subtitle2" >
                                        {this.myState.ticket.replies[0].date}
                                    </Typography>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs>
                            <Grid container direction="row" justify="flex-start" alignItems="flex-end" spacing={4}>
                                <Grid item xs = {1}>
                                 <Typography align="left" variant="subtitle2">
                                    <h4>Status: </h4>
                                    <p />
                                </Typography>
                                </Grid>
                            <Grid item xs style = {{paddingLeft :20}}>
                                <TextField
                                    id="change-status"
                                    select
                                    
                                    
                                    value={this.state.status}
                                    onChange={this.handleStatusChange}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    height='24px'
                                    InputLabelProps={{ shrink: true, }}
                                    style = {{visibility : this.state.status === "Archive" ? 'hidden' : 'visible'}}
                                    disabled={this.state.disable || this.state.isUser}
                                >
                                    {STATUS_VALUES.map(option => (
                                        <MenuItem key={option.value} value={option.value} disabled={this.state.disable}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                <div
                    style={{ paddingLeft: 20, marginTop: "2%", paddingRight: 20 }}
                >
                    <Typography align="left" variant="subtitle1">
                        Messages:<br />
                    </Typography>
                    <TicketMessages
                        key={uuid.u4}
                        messages={this.myState.ticket.replies}>
                    </TicketMessages>
                </div>
                <div
                    style={{ marginLeft: 20, marginTop: "1%", marginRight: 20 }}
                >
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
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true, }}
                        error={((this.state.messageCharsLeft < 0) ? true : false)}
                        disabled={this.state.disable}
                    // required="required"
                    />
                    <Typography 
                        align="right" 
                        color={(this.state.messageCharsLeft >= 0) ? "textSecondary" : "error"}> 
                        {
                        this.state.messageCharsLeft + " characters left"
                        } 
                    </Typography>
                    <MyFileInput/>
                    <div align = "center">
                    <Button
                        variant="contained"
                        
                        disabled={this.state.disable}
                        onClick={this.handleSubmit.bind(this, this.state.reply)}
                        id="submit_button"
                    >
                        Submit
                    </Button>



                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}

// export default withStyles(styles)(TicketThread);
// TicketThread.propTypes = {
//     ticket: PropTypes.object.isRequired
// }