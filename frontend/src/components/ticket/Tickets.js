import React from 'react';
import TicketTable from './TicketTable';
import SimpleTable from './Table';
import uuid from 'uuid';
import NewTicket from './NewTicket';

var ticketArray = [
    {
        id: 1,
        category: 'feedback',
        title: 'ticket1',
        status: 'open',
        messages: [
            { name: 'User1', messages: 'I have a problem' },
            { name: 'Admin1', messages: 'Okay solve your problem' }
        ]
    },
    {
        id: 2,
        category: 'feedback',
        title: 'ticket2',
        status: 'pending',
        messages: [
            { name: 'User1', messages: 'I have a problem' },
            { name: 'Admin1', messages: 'Okay solve your problem' }
        ]
    },
    {
        id: 3,
        category: 'feedback',
        title: 'ticket3',
        status: 'closed',
        messages: [
            { name: 'User1', messages: 'I have a problem' },
            { name: 'Admin1', messages: 'Okay solve your problem' }
        ]
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

    addTicket = (ticket) => {
        console.log("New Ticket: " + ticket.title + " created");
        const newTicket = {
            id: uuid.v4(),
            category: ticket.category,
            title: ticket.title,
            status: 'open',
            messages: []
        }

        this.setState({
            tickets:[...this.state.tickets, newTicket]
        });
    }

    render() {
        return (
            <div>
                {/* <TicketTable
                    tickets={this.state.tickets}
                >
                </TicketTable> */}
                <SimpleTable tickets={this.state.tickets}></SimpleTable>
            </div>
        );
    }
}
