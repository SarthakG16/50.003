import React from "react";
//import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import $ from 'jquery';
import constants from "../../resources/strings.js";
import CATEGORY_VALUES from "../../resources/CategoryConst";
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
        this.state = {
            ticket: Object.assign({}, RESET_VALUES),
            errorText: (Object.assign({}, RESET_VALUES_ERROR)),
            user: props.myState.userProfile.registerCallback(this).value,
            // this.userProfile = props.myState.userProfile.registerCallback(this);
            wordCount: 0,
            // catList: [],
            waiting: false,
        };
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
            }
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

    displayLoadingScreen(e) {
        this.setState((prevState) => ({ waiting: e }));
        console.log(this.state.waiting);
        $("#summit_button").click(function () {
            // Animate loader on screen
            // $("#loadingscreen").show();
        });
        return;
    }

    handleSubmit(e) {
        console.log('clicked submit');
        // this.displayLoadingScreen(true);
        // console.log(this.state.waiting);
        let ticketVaild = this.handleValidation(e);
        // console.log('finish checking');
        // this.displayLoadingScreen(false);
        if (ticketVaild) {
            let ticketLimit = 3;
            //check ticket limit
            var now = new Date(new Date().toUTCString()); //current date/time 
            var lastTicketDate = new Date(this.state.user.lastTicket); //date/time of last posted ticket
            var nextDay = (now.getDay() !== lastTicketDate.getDay() && now.getTime() > lastTicketDate.getTime()); //check if current day > last posted day
            if (this.state.user.numberOfTickets < ticketLimit || nextDay) {
                //reset numberOfTickets if nextDay, and increment by 1
                if (nextDay) {
                    this.state.user.numberOfTickets = 1;
                    this.changeField("numberOfTickets", this.state.user.numberOfTickets);
                } else {
                    this.changeField("numberOfTickets", this.state.user.numberOfTickets++);
                }

                //this.addTicket(e);
                console.log(JSON.stringify(e));
                this.addTicket(e);
                alert("Ticket has been created.")
                this.state.user.lastTicket = this.getDateCreated();
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
            else {
                // lastTicketDate.setHours(23);
                // lastTicketDate.setMinutes(59);
                // lastTicketDate.setSeconds(59);
                // var hoursLeft = (lastTicketDate.getTime() - now.getTime())/3600000;
                // if (hoursLeft < 1) {
                //     var ans = Math.abs(Math.round(hoursLeft * 60));
                //     alert("Exceeded daily ticket limit, please try again in " + ans + " minutes.");
                // } else {
                //     var ans = Math.abs(Math.round(hoursLeft));
                //     alert("Exceeded daily ticket limit, please try again in " + ans + " hour(s).");
                // }
                alert("Exceeded daily ticket limit, please try again tomorrow.");
                return;
            }

        }
        else {
            alert("Please fill in all the required fills.");
            return;
        }
        // prevent the form submit event from triggering an HTTP Post:
        // e.preventDefault();
    }

    handleValidation(e) {

        let ticket = e;
        var errorTextCopy = Object.assign({}, this.state.errorText);
        var count = 0;
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
        }

        if (ticket.message === '') {
            console.log('No message');
            errorTextCopy.message = 'Please fill in a message';
            count += 1;
        }
        else {
            var relevant = this.checkMessageRevelance(ticket.message);
            console.log("what is the relevance value" + relevant);
            if (relevant) {
                errorTextCopy.message = '';
            }
            else {
                errorTextCopy.message = 'Please add more relevant details of your problem.';
                count += 1;
                // alert("Please add more relevant details of your problem.");
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
            return false;
        }
    }

    checkEmail(e) {
        var re = /\S+@\S+\.\S+/;
        return re.test(e);
    }

    checkMessageRevelance(e) {
        // console.log("I am in checking messages and this is my message" + e);
        var numWords = e.split(' ').length
        this.setState({
            wordCount: numWords
        });
        // console.log(e.split(' ').length);
        // console.log(this.state.wordCount);
        if (numWords < 5) {
            return false;
        }

        // const customURL = "https://ug-api.acnapiv3.io/swivel/text-classification/class-1.1?of=json&txt=" + e + "&model=IPTC_en";

        const customURL = "https://ug-api.acnapiv3.io/swivel/text-classification/class-1.1?of=json&txt=" + e + "&model=SocialMedia_en";
        // console.log(customURL);

        var catList;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        var settings = {
            "async": false,
            "crossDomain": true,
            // "url": "https://ug-api.acnapiv3.io/swivel/text-classification/class-1.1?of=json&txt=I need help withmy interet. so they keep saying I am not connected to the internet but i am. I only happens for internet explore not edge not crome or firefox. Why is that so? hahaahahaha you what the problem now. I have no problem. blah blah blah. ===&model=SocialMedia_en",
            "url": proxyurl + customURL,
            "method": "POST",
            "headers": {
                "Server-Token": constants.serverToken,
                "Content-Type": "application/json",
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": ""
        }

        $.ajax(settings)
            .done(function (response) {
                console.log(response);
                // console.log(response.category_list);
                // console.log(response.category_list.type);
                // this.setState({ catList: response.category_list });
                catList = response.category_list;
            })
            .always(function () {
                // alert("complete");
                // $(".loader").fadeOut("slow");
            });

        // console.log("this is this response: " + catList);
        console.log(catList);

        // checking if content is relevant
        var relevance = false;
        var confidence = 0.0;
        catList.map(cat => {
            /*
            if (cat.code.startsWith("010") || cat.code.startsWith("040") || cat.code.startsWith("130")  )  {
                confidence += Number(cat.abs_relevance);
                console.log(cat.abs_relevance);
                // if(parseInt(cat.abs_relevance) > 0.4){
                //     relevance = true;
                // }
            }
            */

            if (cat.code.startsWith("01") || cat.code.startsWith("04") || cat.code.startsWith("09") || cat.code.startsWith("14")) {
                confidence += Number(cat.abs_relevance);
                console.log(cat.abs_relevance);
                // if(parseInt(cat.abs_relevance) > 0.4){
                //     relevance = true;
                // }
                return;
            }
        });
        console.log(confidence);
        if (confidence > 0.3) {
            relevance = true;
        }

        return relevance;
    }

    handleChange(e) {
        var errorTextCopy = Object.assign({}, this.state.errorText);

        const target = e.target;
        const value = target.value;
        const name = target.name;

        if (name === 'email') {
            var validEmail = this.checkEmail(value);
            if (validEmail) {
                errorTextCopy.email = '';
            }
            else {
                errorTextCopy.email = 'Please enter valid email';
            }
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
        // $(window).on('load', function () {
        //     $("#loadingscreen").hide();
        // });
        return (
            <div className="App">
                {/* <div
                    className="loader"
                    id="loadingscreen"
                    hidden={!this.state.waiting}
                ></div> */}
                <div className="container">
                    <Route exact path="/NewTicket" render={props => (
                        <React.Fragment>
                            <h3>Submit a new ticket request</h3>
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
                                        error={((this.state.errorText.title !== '' && this.state.ticket.title === '') ? true : false)}
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
                                        error={(((this.state.errorText.message !== '' && (this.state.ticket.message === "")) || (this.state.errorText.message === "Please add more relevant details of your problem." && this.state.ticket.message.split(" ").length <= this.state.wordCount)) ? true : false)}
                                        //|| this.state.errorText.message === "Please add more relevant details of your problem."
                                        helperText={this.state.errorText.message}
                                    />
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
                                        placeholder="eg abc@vaild.com"
                                        InputLabelProps={{ shrink: true, }}
                                        required={true}
                                        // error={((this.state.errorText.email !== '' && this.state.ticket.email === '') ? true : false)}
                                        error={((this.state.errorText.email !== '' && this.state.ticket.email !== '') ? true : false)}
                                        helperText={this.state.errorText.email}
                                    />

                                    <Grid item xs>
                                        <Button
                                            id="summit_button"
                                            variant="contained"
                                            onClick={this.handleSubmit.bind(this, this.state.ticket)}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>

                                </Grid>
                            </form>
                        </React.Fragment>
                    )} />
                </div>
            </div>

        );
    }
}

// // PropTypes
// NewTicket.propTypes = {
// 	addTicket: PropTypes.func.isRequired
// }