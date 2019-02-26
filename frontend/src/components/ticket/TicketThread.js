import React from 'react'

export default class TicketThread extends React.Component {

    render() {
        console.log('inside a thread');
        return (
            <React.Fragment>
                <p>
                    yay inside a thread!
                    <br></br>
                {this.props.location.state.id}
                <br></br>
                {this.props.location.state.ticket.title}
                </p>
            </React.Fragment>


        );
    }
}