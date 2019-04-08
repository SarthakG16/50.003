import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import NewTicket from "./components/ticket/NewTicket"
import Home from './components/pages/Home';
import AdminDashboard from './components/pages/AdminDashboard';
import Tickets from './components/ticket/Tickets';
import $ from 'jquery';
import constants from "./resources/strings.js";
//import TicketThread from './components/ticket/TicketThread';

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.userProfile = props.myState.userProfile.registerCallback(this);
    this.state = {
      admins: [],
  };
    //this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users?where={%22$relatedTo%22:%20{%22object%22%20:%20%20{%22_type%22%20:%20%22Pointer%22,%20%22className%22:%20%22_Role%22,%20%22objectId%22%20:%20%2243oMG598QS%22},%20%22key%22:%20%22users%22}}",
      "method": "GET",
      "headers": {
        "Server-Token": constants.serverToken,
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      "processData": false,
      "data": ""
    }
    
    $.ajax(settings).done((response) => {
      this.setState({
          admins: response.results
      })
  });
  }

  render() {
    if (Object.entries(this.userProfile.value).length === 0 && this.userProfile.value.constructor === Object) {
      return null
    }

    const {objectId} = this.userProfile.value;
    const isAdmin = this.state.admins.includes(objectId);

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
          /> */}
        </Switch>
      </main>
    )
  }
}
