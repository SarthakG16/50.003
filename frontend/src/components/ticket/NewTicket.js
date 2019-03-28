import React from "react";
//import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
//import $ from 'jquery';
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
            user: this.props.location.user
        };
        console.log(this.state.user);
    }

    // returns the date and time the reply was posted in UTC
    getDateCreated() {
        var today = new Date();
        console.log(today);
        return today.toUTCString();
    }
    addTicket(e) {
    
        let data = {
            title: e.title,
            category: e.category,
            replies: [
                {
                    //name: this.state.user.username,
                    name: "User1",
                    message: e.message,
                    date: this.getDateCreated()
                }

            ],
            status: 'Open',
            email: e.email,
            ACL: {
                "*": {
                    "read": false
                },
                [this.state.user.objectId]: {
                    "read":true,
                    "write":true
                    
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

    handleSubmit(e) {
        console.log('clicked submit');
        let ticketVaild = this.handleValidation(e);
        console.log('finish checking');

        if (ticketVaild) {
            //this.addTicket(e);
            console.log(JSON.stringify(e));
            this.addTicket(e);
            alert("Ticket has been created.")

            //send notification
            this.sendNotif(e);

            // window.location.herf = '/';
            this.props.history.push('/');
            // reset the form values to blank after submitting:
            this.setState({
                ticket: Object.assign({}, RESET_VALUES),
            });
            return;
            // this.props.history.push('/');
            //return <Redirect to='/' push={true}></Redirect>;
        } else {
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
        else{
            errorTextCopy.title = '';
        }
        
        if (ticket.category === '') {
            console.log('No category');
            errorTextCopy.category = 'Please fill in a category';
            count += 1;
        }
        else{
            errorTextCopy.category = '';
        }
        
        if (ticket.message === '') {
            console.log('No message');
            errorTextCopy.message = 'Please fill in a message';
            count += 1;
        }
        else{
            errorTextCopy.message = '';
        }
        
        if (ticket.email === '') {
            console.log('No email');
            errorTextCopy.email = 'Please fill in a email';
            count += 1;
        }
        else{
            errorTextCopy.email = '';
        }

        this.setState({errorText: errorTextCopy});
        // console.log("count is " + count);
        if(count === 0){
            this.setState({errorText: Object.assign({}, RESET_VALUES_ERROR)});
            return true;
        }
        else{
            return false;
        }
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => {
            prevState.ticket[name] = value;
            return { ticket: prevState.ticket };
        });
    }

    //need help
    sendNotif(e) {
        let emailBody = {
            "subject": "Test subject using ACNAPI",
            "sender": "sarthakganoothrkar@gmail.com",
            "recipient": e.email,
            "html": "<h1>HELLO!</h1>"
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

        /*
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://ug-api.acnapiv3.io/swivel/email-services/api/mailer",
            "method": "POST",
            "headers": {
                "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
                "Content-Type": "application/json",
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": JSON.stringify(emailBody)
          }
          
          $.ajax(settings).done(function (response) {
            console.log("Email sent");
          });*/
    }


    render() {
        return (
            <div className="App">
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
                                        InputProps={{ style: { textAlign: "Left" }}}
                                        InputLabelProps={{ shrink: true,}}
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
                                        error={((this.state.errorText.message !== '' && this.state.ticket.message === '') ? true : false)}
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
                                        error={((this.state.errorText.email !== '' && this.state.ticket.email === '') ? true : false)}
                                        helperText={this.state.errorText.email}
                                    />

                                    <Grid item xs>
                                        <Button
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