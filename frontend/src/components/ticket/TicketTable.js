import React from 'react';
import TicketRow from './TicketRow';
import PropTypes from 'prop-types'

export default class TicketTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        console.log("In Ticket Table");
        return this.props.tickets.map((ticket) => (
            <TicketRow
                key={ticket.id}
                ticket={ticket}
            ></TicketRow>
        ));
    }
}

TicketTable.propTypes = {
    tickets: PropTypes.array.isRequired
}