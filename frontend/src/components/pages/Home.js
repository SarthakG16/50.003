import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login'
//import FAQ from './FAQ';
import NewTicket from "../ticket/NewTicket"
import Tickets from '../ticket/Tickets';
import TicketThread from '../ticket/TicketThread'
import AdminDashboard from './AdminDashboard';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			status: null,

		}
		this.userProfile = props.myState.userProfile.registerCallback(this);
		console.log("I have constructed user dashboard");
		// console.log(this.userProfile.value);

		//this.handleClick = this.handleClick.bind(this);
	}


	render() {
		return (
			<div className="App">
				<div className="container">
					<Route exact path="/" render={props => (
						<React.Fragment>
							<p>Tickets</p>
							<Tickets
								myState={this.props.myState}
								origin="Home">
							</Tickets>
						</React.Fragment>
					)} />
					<Route
						path="/Archive"
						render={() => (
							<Tickets
								myState={this.props.myState}
								origin="Archive">
							</Tickets>
						)}
					/>
					<Route path="/NewTicket" component={NewTicket} />
					<Route path="/login" component={Login} />
					<Route path="/Ticket" component={TicketThread} />
					<Route path='/AdminHome' // to be removed, just to test the see admin dashboard
						render={() => (
							<AdminDashboard myState={this.props.myState}></AdminDashboard>
						)}
					/>
					<Route
						path="/Pending"
						render={() => (
							<Tickets
								myState={this.props.myState}
								origin="Pending"></Tickets>
						)}
					/>

					<Route
						path="/Open"
						render={() => (
							<Tickets
								myState={this.props.myState}
								user={this.userProfile} origin="Open"></Tickets>
						)}
					/>
				</div>
			</div>
		);
	}
}

