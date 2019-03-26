import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login'
//import FAQ from './FAQ';
import NewTicket from "../ticket/NewTicket"
import Tickets from '../ticket/Tickets';
import TicketThread from '../ticket/TicketThread'
import AdminDashboard from './AdminDashboard';

export default class Home extends React.Component {

	render() {
		return (
			<div className="App">
				<div className="container">
					<Route exact path="/" render={props => (
						<React.Fragment>
                            <p>Tickets</p> 
                            <Tickets origin = "Home"></Tickets>
						</React.Fragment>
					)} />
					<Route
  						path="/Archive"
  						render={(origin) => (
							<Tickets origin = "Archive"></Tickets>
						  )}
						/>
					<Route path="/NewTicket" component={NewTicket} />
					<Route path="/login" component={Login} />
					<Route path="/Ticket" component={TicketThread}/>
					<Route path="/AdminHome" component={AdminDashboard}/>
				</div>
			</div>
    );
  }
}
