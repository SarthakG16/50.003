import React from 'react';
import TicketTable from './TicketTable';

var ticketArray = [
    {
        id: 1,
        category: 'feedback',
        title: 'ticket1',
        status: 'open'
    },
    {
        id: 2,
        category: 'feedback',
        title: 'ticket2',
        status: 'pending'
    },
    {
        id: 3,
        category: 'feedback',
        title: 'ticket3',
        status: 'closed'
    }

];

export default class Tickets extends React.Component {
    constructor(props) {
        super(props);
        console.log("in tickets now, passing tickets var to table");

        this.state = {
            tickets: ticketArray

        };
    }

    render() {
        return (
            <div>
                <TicketTable
                    tickets={this.state.tickets}
                >
                </TicketTable>
            </div>
        );
    }
}
