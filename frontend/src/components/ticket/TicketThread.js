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
        { name: 'User1', message: 'I have a problem' },
        { name: 'Admin1', message: 'Okay solve your problem' }];

const RESET_VALUES = {
    name: 'User1',
    message: '',
};

class TicketThread extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            reply: Object.assign({}, RESET_VALUES),
        };
    }

    handleSubmit(e) {
        console.log('clicked submit');
        // let ticketVaild = this.handleValidation(e);
        console.log('finish checking');

        // if (ticketVaild) {
        //     //this.addTicket(e);
        //     console.log(JSON.stringify(e));
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
        // }
        // // prevent the form submit event from triggering an HTTP Post:
        // e.preventDefault();

    }

    handleValidation(e) {
        let reply = e;
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
        const value = e.value;
        const name = 'User1';

        this.setState((prevState) => {
            prevState.reply.message = value;
            prevState.reply[name] = name;
            return { reply: prevState.reply };
        });
    }

    render() {
        console.log('inside a thread');
        return (
            <React.Fragment>
                <p>

                </p>
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
                <p>
                </p>
                <div>
                    <p align='left'>
                        Message:<br />
                        {/* {this.props.location.state.ticket.message} */}
                    </p>
                    <TicketMessages
                        key={uuid.u4}
                        messages={messagesTest}>
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