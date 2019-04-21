import React from "react";
//import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import $ from 'jquery';
import constants from "../../resources/strings.js";
import { CATEGORY_VALUES, categoriesOnly, stopWords, helpWords, catWords } from "../../resources/CategoryConst";
import { Button, Grid, MenuItem, TextField, Typography } from '@material-ui/core';

const RESET_VALUES = {
    category: '',
    message: '',
    title: '',
    email: '',
    status: 'Open'
};

const RESET_VALUES_ERROR = { title: '', message: '', category: '', email: '' };

export default class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.emailMaxChars = 320;
        this.titleMaxChars = 100;
        this.maxMessageChars = 1000;
        this.state = {
            ticket: Object.assign({}, RESET_VALUES),
            errorText: (Object.assign({}, RESET_VALUES_ERROR)),
            user: props.myState.userProfile.registerCallback(this).value,
            // this.userProfile = props.myState.userProfile.registerCallback(this);
            wordCount: 0,
            messageCharsLeft: this.maxMessageChars,
            // catList: [],
            waiting: false,
        };
        this.isAdmin = props.isAdmin;
        this.numberOfTickets = this.state.user.numberOfTickets;
        this.previousMsg = "";
        console.log(this.state.user);
        // $(window).on('load', function () {
        //     $("#loadingscreen").hide();
        // });
    }

    // returns the date and time the reply was posted in UTC
    getDateCreated() {
        var today = new Date();
        // console.log(today);
        return today.toUTCString();
    }

    addTicket(e) {

        let data = {
            title: e.title,
            category: e.category,
            replies: [
                {
                    name: this.state.user.username,
                    // name: "User1",
                    message: e.message,
                    date: this.getDateCreated()
                }

            ],
            status: 'Open',
            email: e.email,
            replyCount: 1,
            ACL: {
                "*": {
                    "read": false
                },
                [this.state.user.objectId]: {
                    "read": true,
                    "write": true

                },
                "role:admin": {
                    "read": true,
                    "write": true
                }
            },
            adminNew : true,
            userNew : true
        }
        console.log(data);

        fetch('https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Server-Token": constants.serverToken,
                    "cache-control": "no-cache",
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

    }

    changeField(field, param) {
        if (typeof param === 'string') { param = "\"" + param + "\""; }
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users/" + this.state.user.objectId,
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
                "Server-Token": constants.serverToken,
                "X-Parse-Session-Token": localStorage.getItem("sessionToken"),
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": "{  \n\t\"" + field + "\":" + param + "\n}"
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }

    checkSpam(e) {
        let ticketLimit = 3;
        //check ticket limit
        var now = new Date(new Date().toUTCString()); //current date/time 
        var lastTicketDate = new Date(this.state.user.lastTicket); //date/time of last posted ticket
        //var nextDay = (now.getDay() !== lastTicketDate.getDay() && now.getTime() > lastTicketDate.getTime()); //check if current day > last posted day
        var checkYear = now.getYear() > lastTicketDate.getYear();
        var checkMonth = now.getMonth() > lastTicketDate.getMonth();
        var checkDate = now.getDate() > lastTicketDate.getDate();
        var nextDay = checkYear || checkMonth || checkDate;
        if (this.isAdmin) {
            return true;
        }
        // var nextDay = +now > +lastTicketDate;
        // if (this.state.user.numberOfTickets < ticketLimit || nextDay) {
        if ((this.numberOfTickets < ticketLimit || nextDay) && e.message.length <= this.maxMessageChars) {
            // reset numberOfTickets if nextDay, and increment by 1
            if (nextDay) {
                this.numberOfTickets = 1;
                this.changeField("numberOfTickets", this.numberOfTickets);
            } else {
                this.numberOfTickets = this.numberOfTickets + 1
                console.log(this.numberOfTickets);
                this.changeField("numberOfTickets", this.numberOfTickets);
            }
            return true;
        }
        else if (e.message.length > this.maxMessageChars) {
            alert("Message character count is too high, please shorten your message.");
        }
        else {

            alert("Exceeded daily ticket limit, please try again tomorrow.");
            return false;
        }
    }

    handleSubmit(e) {
        console.log('clicked submit');
        // this.displayLoadingScreen(true);
        // console.log(this.state.waiting);
        let ticketValid = this.handleValidation(e);
        let notSpam = this.checkSpam(e);
        // console.log('finish checking');
        // this.displayLoadingScreen(false);
        if (ticketValid && notSpam) {
            console.log(JSON.stringify(e));
            this.addTicket(e);
            alert("Ticket has been created.")
            this.setState({
                lastTicket: this.getDateCreated()
            })
            this.changeField("lastTicket", this.state.user.lastTicket); //updating user lastTicket field

            //send notification
            this.sendNotif(e);

            window.location.replace("/");
            // window.location.herf = '/';
            // this.props.history.push('/');
            // reset the form values to blank after submitting:
            this.setState({
                ticket: Object.assign({}, RESET_VALUES),
            });
            return;
            // this.props.history.push('/');
            //return <Redirect to='/' push={true}></Redirect>;

        }
        else if (notSpam) {
            // alert("Please fill in all the required fills.");
            return;
        }
        // prevent the form submit event from triggering an HTTP Post:
        // e.preventDefault();
    }

    handleValidation(e) {

        let ticket = e;
        var errorTextCopy = Object.assign({}, this.state.errorText);
        var count = 0;
        var catList = 24; // default is others
        if (ticket.title === '') {
            console.log('No title');
            errorTextCopy.title = 'Please fill in a title';
            count += 1;
        }
        else {
            errorTextCopy.title = '';
        }

        if (ticket.category === '') {
            console.log('No category');
            errorTextCopy.category = 'Please fill in a category';
            count += 1;
        }
        else {
            errorTextCopy.category = '';
            catList = categoriesOnly.indexOf(ticket.category);
            console.log(catList);
        }

        if (ticket.message === '') {
            console.log('No message');
            errorTextCopy.message = 'Please fill in a message';
            count += 1;
        }
        else {
            errorTextCopy.message = '';

            var relevant = this.checkMessageRevelance(ticket.message, catList);
            console.log("what is the relevance value: " + relevant);
            if (relevant) {
                errorTextCopy.message = '';
            }
            else {
                errorTextCopy.message = 'Please add more relevant details of your problem.';
                count += 1;
                this.previousMsg = ticket.message;
            }

        }

        if (ticket.email === '') {
            console.log('No email');
            errorTextCopy.email = 'Please fill in a email';
            count += 1;
        }
        else {
            errorTextCopy.email = '';
        }

        this.setState({ errorText: errorTextCopy });
        // console.log("count is " + count);

        if (count === 0) {
            this.setState({ errorText: Object.assign({}, RESET_VALUES_ERROR) });
            return true;
        }
        else {
            if (errorTextCopy.message === "Please add more relevant details of your problem.") {
                alert("Please fill in all the required fills. \nPlease add more relevant details of your problem.");
            } else {
                alert("Please fill in all the required fills.");
            }

            return false;
        }
    }

    checkEmail(e) {
        // var re = /\S+@\S+\.\S+/;
        var re = /^(([^<>()\[\]\\.,;*:\s@"]+(\.[^<>()\[\]\\.,;:*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(e);
    }

    removeStopwords(e) {
        var noNumPuntuation = e.match(/[^_\W]+/g).join(' ');
        let msgArray = noNumPuntuation.split(' ');
        // console.log(msgArray)

        var cleanedMsg = [];

        for (let j = 0; j < msgArray.length; ++j) {
            var match = false;
            // console.log(msgArray[j]);
            for (let i = 0; i < stopWords.length; ++i) {
                // console.log(stopwords[i]);
                let stopW = stopWords[i];
                if (stopW === msgArray[j].toLowerCase()) {
                    // console.log("true");
                    match = true;
                }
            }
            if (!match) {
                cleanedMsg.push(msgArray[j].toLowerCase())
            }
        }

        // console.log(cleanedMsg);

        return cleanedMsg;
    }

    checkForHelpwords(e, number) {
        var msgArray = e;
        // console.log(msgArray)
        let oriLength = msgArray.length;
        // console.log(oriLength)

        // check of multiple repeated characters before relevance
        for (let i = 0; i < msgArray.length; ++i) {
            var repeatedL = 0;
            for (let j = 0; j < msgArray[i].length; ++j) {
                if (msgArray[i].charAt(j) === msgArray[i].charAt(j + 1)) {
                    // console.log(msgArray[i].charAt(j));
                    repeatedL += 1;
                }
                else {
                    repeatedL = 0;
                }
                // console.log(repeatedL);
                if (repeatedL > 2) {
                    return 0;
                }
            }
        }

        // check of multiple repeated words before relevance
        for (let i = 0; i < msgArray.length; ++i) {
            var repeated = 0;
            for (let j = 0; j < msgArray.length; ++j) {
                if (msgArray[j] === msgArray[i]) {
                    repeated += 1;
                }
            }
            if (repeated > msgArray.length / 2) {
                return 0;
            }
        }

        // var relevanceW = catWords[number];
        var relevanceW = helpWords.concat(catWords[number]);
        // console.log("this are the list of words " + relevanceW);

        var relevanceCount = 0;

        for (let i = 0; i < relevanceW.length; ++i) {
            // console.log(stopwords[i]);
            let helpW = relevanceW[i];
            for (let j = 0; j < msgArray.length; ++j) {
                // console.log(msgArray[j]);
                if (helpW === msgArray[j]) {
                    // console.log("true");
                    relevanceCount += 1;
                }
            }
        }
        return relevanceCount / oriLength;
    }

    checkMessageRevelance(e, number) {
        let cleanedMsg = this.removeStopwords(e);
        console.log(cleanedMsg);
        // let cleanedMsgArray = cleanedMsg.split(' ');
        let cleanedMsgArray = cleanedMsg;
        let prob = this.checkForHelpwords(cleanedMsgArray, number);
        console.log(prob);

        var relevance = false;

        if (prob > 0.25 && prob < 1) {
            relevance = true
        }
        return relevance;
    }

    handleChange(e) {
        var errorTextCopy = Object.assign({}, this.state.errorText);

        const target = e.target;
        var value = target.value;
        const name = target.name;

        if (name === 'title') {
            if (value.length > this.titleMaxChars) {
                errorTextCopy.title = 'Please shorten your title';
            }
            else {
                errorTextCopy.title = '';
            }
        }

        if (name === 'email') {
            var validEmail = this.checkEmail(value);
            if (validEmail) {
                errorTextCopy.email = '';
            }
            // else if (value.length > this.emailMaxChars) {
            //     errorTextCopy.email = 'Email is too long';
            // }
            else {
                errorTextCopy.email = 'Please enter valid email';
            }
        }

        if (name === 'message') {
            this.setState({
                messageCharsLeft: this.maxMessageChars - value.length,
            });
        }

        this.setState((prevState) => {
            prevState.ticket[name] = value;
            return { ticket: prevState.ticket, errorText: errorTextCopy };
        });
    }

    sendNotif(e) {
        let emailBody = {
            "subject": "Ticket submission",
            "sender": "Accenture@do-not-reply.com",
            "recipient": e.email,
            "html": "<p>Hello " + this.state.user.username + ",</p><p>Your submission has been received. Please be patient as an administrator will reply to your ticket shortly.</p><p>-Ticket details-<br />Title: " + e.title + "<br />Category: " + e.category + "<br />Date/time of submission: " + this.getDateCreated() + "<br />Message: " + e.message
        }
        console.log(emailBody);
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


    render() {
        return (
            <Route exact path="/NewTicket" render={props => (
                <React.Fragment>
                    <div className="newticket">
                        <h3 align="center">Submit a new ticket request</h3>
                        <form
                            style={{ paddingLeft: 20, marginTop: "1%", paddingRight: 20 }}
                        >
                            <Grid
                                container direction="column" justify="space-between" spacing={16}
                            >
                                <Typography
                                    align="left" variant="h6"
                                >
                                    Title
                                        </Typography>
                                <TextField
                                    // label="Title"
                                    name="title"
                                    multiline
                                    rowsMax="2"
                                    type='text'
                                    value={this.state.ticket.name}
                                    onChange={this.handleChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="Title"
                                    InputLabelProps={{ shrink: true, }}
                                    required={true}
                                    error={((
                                        (this.state.errorText.title !== '' && this.state.ticket.title === '') ||
                                        (this.state.ticket.title.length > this.titleMaxChars)
                                    ) ? true : false)}
                                    helperText={this.state.errorText.title}
                                >
                                </TextField>
                                <Typography
                                    align="left" variant="h6"
                                >
                                    Category
                                        </Typography>
                                <TextField
                                    name="category"
                                    select
                                    value={this.state.ticket.category}
                                    onChange={this.handleChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{ style: { textAlign: "Left" } }}
                                    InputLabelProps={{ shrink: true, }}
                                    required={true}
                                    error={((this.state.errorText.category !== '' && this.state.ticket.category === '') ? true : false)}
                                    helperText={this.state.errorText.category}
                                >
                                    {CATEGORY_VALUES.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Typography
                                    align="left" variant="h6"
                                >
                                    Message
                                        </Typography>
                                <TextField
                                    name="message"
                                    multiline
                                    value={this.state.ticket.message}
                                    onChange={this.handleChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="Message"
                                    InputLabelProps={{ shrink: true, }}
                                    required={true}
                                    error={((
                                        (this.state.errorText.message !== "" && (this.state.ticket.message === "")) ||
                                        (this.state.errorText.message === "Please add more relevant details of your problem." && this.state.ticket.message === this.previousMsg) ||
                                        (this.state.messageCharsLeft < 0)
                                    ) ? true : false)}
                                    //|| this.state.errorText.message === "Please add more relevant details of your problem."
                                    helperText={this.state.errorText.message}
                                />
                                <Typography
                                    align="right"
                                    color={(this.state.messageCharsLeft >= 0) ? "textSecondary" : "error"}>
                                    {
                                        this.state.messageCharsLeft + " characters left"
                                    }
                                </Typography>
                                <Typography
                                    align="left" variant="h6"
                                >
                                    Email
                                        </Typography>
                                <TextField
                                    name="email"
                                    type='email'
                                    value={this.state.ticket.email}
                                    onChange={this.handleChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="eg abc@valid.com"
                                    InputLabelProps={{ shrink: true, }}
                                    required={true}
                                    // error={((this.state.errorText.email !== '' && this.state.ticket.email === '') ? true : false)}
                                    error={(
                                        (this.state.errorText.email !== ''
                                        ) ? true : false)}
                                    helperText={this.state.errorText.email}
                                />

                                <Grid item xs>
                                    <div align="center">
                                        <Button
                                            id="submit_button"
                                            variant="contained"
                                            onClick={this.handleSubmit.bind(this, this.state.ticket)}
                                        >
                                            Submit
                                                </Button>
                                    </div>

                                </Grid>

                            </Grid>
                        </form>
                    </div>
                </React.Fragment>
            )} />
        );
    }
}

// // PropTypes
// NewTicket.propTypes = {
// 	addTicket: PropTypes.func.isRequired
// }