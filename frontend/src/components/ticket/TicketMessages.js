import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TicketMessageRow from './TicketMessageRow';
import uuid from 'uuid';

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

    render() {
        console.log('Trying to display messages');
        const {messages} = this.props;
        return messages.map((message) =>
        <TicketMessageRow
            key={uuid.u4}
            message={message}
        ></TicketMessageRow>
        );
    }
}

export default withStyles(styles)(TicketMessages);

TicketMessages.propTypes = {
    messages: PropTypes.array.isRequired
}