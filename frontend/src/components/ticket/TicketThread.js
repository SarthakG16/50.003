import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TicketMessages from './TicketMessages';
import uuid from 'uuid';

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

class TicketThread extends React.Component {

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
            </React.Fragment>


        );
    }
}

export default withStyles(styles)(TicketThread);
// TicketThread.propTypes = {
//     ticket: PropTypes.object.isRequired
// }