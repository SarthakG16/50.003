import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login'
import FAQ from './FAQ';
import NewTicket from "../ticket/NewTicket"
import Tickets from '../ticket/Tickets';
import TicketThread from '../ticket/TicketThread'

export default class Home extends React.Component {
	render() {
		return (
			<div className="App">
				<div className="container">
					<Route exact path="/" render={props => (
						<React.Fragment>
                            <p>This is the home page</p>
                            <Tickets></Tickets>
						</React.Fragment>
					)} />
					<Route path="/FAQ" component={FAQ} />
					<Route path="/NewTicket" component={NewTicket} />
					<Route path="/login" component={Login} />
					<Route path="/Ticket" component={TicketThread}/>
				</div>
			</div>
    );
  }
}
