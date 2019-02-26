import React from 'react';
import PropTypes from 'prop-types';

export default class TicketRow extends React.Component{
    getStyle = () => {
		return {
			background: '#f4f4f4',
			padding: '10px',
			borderBottom: '1px #ccc dotted',
        }
    }

    render(){
        const{id, title} = this.props.ticket;
        console.log("In Ticket Row");
        return(
            <div style={this.getStyle()}>
                <p>
                    {id}
                    {title}
                </p>
            </div>
        )
    }
}

TicketRow.propTypes = {
    ticket: PropTypes.object.isRequired
}