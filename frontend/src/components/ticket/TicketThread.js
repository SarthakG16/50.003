import React from 'react'


const TICKETNUMBER =({match}) =>{
    return (<h1>Viewing Ticket {match.params.ticketID}</h1>)
};

export default class TicketThread extends React.Component {

    render(){
        console.log('inside a thread')
        return(
            <p>
                yay inside a thread!
            </p>

        );
    }
}