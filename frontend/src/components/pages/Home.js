import React from 'react';
import { Switch,Route } from 'react-router-dom';
import NewTicket from "../ticket/NewTicket"
import Tickets from '../ticket/Tickets';
import TicketThread from '../ticket/TicketThread'
import NotFound from './NotFound';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			status: null,

		}
		this.userProfile = props.myState.userProfile.registerCallback(this);
		this.isAdmin = props.isAdmin;
		console.log("I have constructed user dashboard");
		// console.log(this.userProfile.value);

		//this.handleClick = this.handleClick.bind(this);
	}


	render() {
		return (
			<div className="App-body">
				<div className="container">
				<Switch>
					<Route exact path="/" render={props => (
						<React.Fragment>
							{/* <p>Tickets</p> */}
							<Tickets
								myState={this.props.myState}
								origin="Home"
								isAdmin={this.isAdmin}>
							</Tickets>
						</React.Fragment>
					)} />
					<Route
						exact path="/Archive"
						render={() => (
							<Tickets
								myState={this.props.myState}
								origin="Archive"
								isAdmin={this.isAdmin}>
							</Tickets>
						)}
					/>
					<Route
						exact path="/NewTicket"
						render={() => (
							<NewTicket
								myState={this.props.myState}
								isAdmin={this.isAdmin}>
							</NewTicket>
						)}
					/>
					<Route path="/Ticket" component={TicketThread} />
					<Route component={NotFound} />
				</Switch>
				</div>
			</div>
		);
	}
}

