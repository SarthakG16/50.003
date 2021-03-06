import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TicketMessageRow from './TicketMessageRow';
import { parseMessage } from '../../resources/fileDownload';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        spacing: theme.spacing.unit * 2,
    },
});

class TicketMessages extends React.Component {

    constructor(props) {
        super(props);
        // console.log("inside Ticket messages, will start assigning");
        this.state = {
        };
    }

    render() {
        // console.log('Trying to display messages');
        const { messages } = this.props;
        
        return (
            <React.Fragment>
                {messages.map((message, index) =>
                    <TicketMessageRow
                        key={index}
                        user={message.name}
                        date={message.date}
                        message={parseMessage(message.message, false)}
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