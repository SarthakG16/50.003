import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import TicketThread from './TicketThread';



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
            redirect: false
        }

        //this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ticket) {
        console.log("Clicked " + ticket.id);
        this.setState({
            redirect: true
        });
    }

    renderRedirect(ticket) {
        if (this.state.redirect) {
            console.log(this.props.history);
            return <Redirect to={`/Ticket`} push={true}></Redirect>;
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
                            Ticket ID: {ticket.id}
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
