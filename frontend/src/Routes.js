import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import NewTicket from "./components/ticket/NewTicket"
import Home from './components/pages/Home';
import AdminDashboard from './components/pages/AdminDashboard';
import Tickets from './components/ticket/Tickets';
import TicketThread from './components/ticket/TicketThread';

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.userProfile = props.myState.userProfile.registerCallback(this);
    //this.handleClick = this.handleClick.bind(this);
  }
  render() {
    if (Object.entries(this.userProfile.value).length === 0 && this.userProfile.value.constructor === Object) {
      return null
    }

    const {username} = this.userProfile.value;
    const isAdmin = username.startsWith("admin");

    return (
      <main>
        <Switch>
          <Route path='/' // change to userHome after login page is done
            render={() => (
              isAdmin ? <AdminDashboard myState={this.props.myState}></AdminDashboard> :
              <Home myState={this.props.myState}></Home>
            )}
          />
          <Route path="/login" component={Login} />
          <Route path="/NewTicket" component={NewTicket} />
          <Route
            path="/Archive"
            render={() => (
              <Tickets user={this.userProfile} origin="Archive"></Tickets>
            )}
          />
          {/* <Route path="/Ticket"
            render={() => (
              <TicketThread myState={this.props.myState}></TicketThread>
            )}
          /> */}
          {/* <Route path='/AdminHome'
            render={() => (
              <AdminDashboard myState={this.props.myState}></AdminDashboard>
            )}
          /> */}
          {/* <Route
            path="/Pending"
            render={() => (
              <Tickets
                // myState={this.props.myState}
                origin="Pending"></Tickets>
            )}
          />

          <Route
            path="/Open"
            render={() => (
              <Tickets
                // myState={this.props.myState}
                user={this.userProfile} origin="Open"></Tickets>
            )} */}
          />
        </Switch>
      </main>
    )
  }
}
