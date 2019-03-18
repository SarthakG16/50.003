import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TicketMessages from './TicketMessages';
import uuid from 'uuid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        spacing: theme.spacing.unit * 2,
    },
});

const messagesTest = [
        { name: 'User1', message: 'I have a problem'},
        { name: 'Admin1', message: 'Okay solve your problem'}];

const RESET_VALUES = {
    name: 'User1',
    message: '',
    date: ''
};

class TicketThread extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addReply = this.addReply.bind(this);
        this.getDateCreated = this.getDateCreated.bind(this);
        this.state = {
            reply: Object.assign({}, RESET_VALUES),
        };
    }

    getDateCreated(){
        var today = new Date();
        console.log(today);
        return today.toUTCString();
    }

    addReply(e) {
        // getting the ticket variables for PUT
        var objectId = this.props.location.state.ticket.objectId;
        var replies = this.props.location.state.ticket.replies;
        console.log(objectId);
        console.log(replies);

        e.date =  this.getDateCreated();
        console.log(e);

        // adding the new reply to the original
        replies.push(e);
        console.log(replies);
        // console.log(JSON.stringify(replies));
        
        // changing the url
        let objString = "/swivel/acnapi-common-services/common/classes/Tickets/" + objectId.toString();
        var a = new URL("https://ug-api.acnapiv3.io");
        console.log(a);
        var b = new URL(objString, "https://ug-api.acnapiv3.io");
        // https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets/2aPEA53ynY
        // const url = new URL("https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets");
        // let address = 'https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets';
        console.log(b);
        
        fetch(b,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
                    "cache-control": "no-cache",
                },
                body: JSON.stringify(replies)
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    
    }

    handleSubmit(e) {
        console.log('clicked submit');
        let ticketVaild = this.handleValidation(e);        
        console.log('finish checking');
        if (ticketVaild) {
            this.addReply(e);
        //     this.addTicket(e);
        //     alert("Ticket has been created.")
        //     // reset the form values to blank after submitting:
        //     this.setState({
        //         ticket: Object.assign({}, RESET_VALUES),
        //     });
        //     this.props.history.push('/');
        //     //return <Redirect to='/' push={true}></Redirect>;
        // } else {
        //     alert("Please fill in all the required fills.");
        }
        // // prevent the form submit event from triggering an HTTP Post:
        // e.preventDefault();

    }

    handleValidation(e) {
        let reply = e;
        console.log(e);
        if (reply.message === '') {
            console.log('No messages');
            return false;
        }
        // if (ticket.category === '') {
        //     console.log('No category');
        //     return false;
        // }
        // if (ticket.message === '') {
        //     console.log('No message');
        //     return false;
        // }
        return true;
    }

    handleChange(e) {
        const value = e.target.value;
        const name = 'User1';

        this.setState((prevState) => {
            prevState.reply.message = value;
            prevState.reply.name = name;
            return { reply: prevState.reply };
        });
    }

    render() {
        console.log('inside a thread');
        return (
            <React.Fragment>
                <div>
                    <Paper elevation={5}>
                        <Typography align="left" variant="subtitle1">
                            Ticket ID: {this.props.location.state.id}
                            <p />
                        </Typography>
                        <Typography align="left" variant="headline">
                            Title: {this.props.location.state.ticket.title}
                            <p />
                        </Typography>
                        <Typography align="left" variant="caption">
                            Timestamp: {this.props.location.state.ticket.createdAt} <br />
                            Status: {this.props.location.state.ticket.status}
                        </Typography>
                    </Paper>
                </div>
                <div>
                    <p align='left'>
                        Message:<br />
                        {/* {this.props.location.state.ticket.message} */}
                    </p>
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
                            rowsMax="4"
                            value={this.state.reply.message}
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
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