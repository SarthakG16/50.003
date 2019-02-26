import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

export default class TicketRow extends React.Component {
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            ticketID: -1,
            ticketState: null
        }

        //this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ticket) {
        console.log("Clicked " + ticket.id);
        this.setState({
            redirect: true,
            ticketID: ticket.objectId,
            ticketState: ticket
        });
    }

    renderRedirect() {
        if (this.state.redirect) {
            console.log('redirecting');
            return <Redirect to={{pathname:`/Ticket/`+ this.state.ticketID, 
            state: {id:this.state.ticketID, ticket: this.state.ticketState}}} push={true}></Redirect>;
        }
    }

    render() {
        const { ticket } = this.props;
        console.log("In Ticket Row");
        return (
            <Card>
                {this.renderRedirect()}
                <CardActionArea onClick={this.handleClick.bind(this, ticket)}>
                    <CardContent>       
                        <Typography component="p">
                            Ticket ID: {ticket.objectId}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            Title: {ticket.title}
                        </Typography>
                        <Typography component="p">
                            Status: {ticket.status}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

TicketRow.propTypes = {
    ticket: PropTypes.object.isRequired
}
