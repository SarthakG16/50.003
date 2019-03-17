import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TicketMessageRow from './TicketMessageRow';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit *2,
        spacing: theme.spacing.unit * 2,
    },
});

class TicketMessages extends React.Component {

    constructor(props) {
        super(props);
        console.log("inside Tticket messages, will start assigning");
        this.state = {
        };
    }

    render() {
        console.log('Trying to display messages');
        const {messages} = this.props;
        return (
            <React.Fragment>
                {messages.map((message, index) =>
                    <TicketMessageRow
                        key={index}
                        user={message.name}
                        message={message.message}
                    ></TicketMessageRow>
                )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TicketMessages);

TicketMessages.propTypes = {
    messages: PropTypes.array.isRequired
}