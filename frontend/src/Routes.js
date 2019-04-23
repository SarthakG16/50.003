import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './components/pages/Home';
import AdminDashboard from './components/pages/AdminDashboard';
import $ from 'jquery';
import constants from "./resources/strings.js";
import NewTicket from "./components/ticket/NewTicket"
import Tickets from './components/ticket/Tickets';
import TicketThread from './components/ticket/TicketThread'
import NotFound from './components/pages/NotFound';

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.userProfile = props.myState.userProfile.registerCallback(this);
    this.state = {
      isLoaded: false,
      admins: [],
    };
    //this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
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
        isLoaded: true,
        admins: response.results
      })
    });
  }

  render() {
    // const { classes } = this.props;
    console.log("Iam inside routes")

    if (Object.entries(this.userProfile.value).length === 0 && this.userProfile.value.constructor === Object) {
      return null
    }
    //while (this.state.isLoaded != true) {console.log("Why")};
    const { objectId } = this.userProfile.value;
    // console.log(this.state.admins);
    // console.log(objectId);
    var isAdmin = false;
    this.state.admins.map(admin => {
      if (admin.objectId === objectId) {
        isAdmin = true;
        return true;
      }
      return true;
    });
    // console.log("admin?" + isAdmin)
    // console.log("I am in routes")
    if (isAdmin) {
      return (
        <div className="App-body">
          <div className="container">
            <AdminDashboard myState={this.props.myState} isAdmin={isAdmin}></AdminDashboard>

            {/* <Switch>
              <Route exact path='/'
                render={() => (<AdminDashboard myState={this.props.myState} isAdmin={isAdmin}></AdminDashboard
                >
                )}
              />
              <Route
                path="/Pending"
                render={() => (
                  <Tickets
                    myState={this.props.myState}
                    isAdmin={this.isAdmin}
                    origin="Pending"></Tickets>
                )}
              />
              <Route
                path="/Open"
                render={() => (
                  <Tickets
                    myState={this.props.myState}
                    isAdmin={this.isAdmin}
                    origin="Open"></Tickets>
                )}
              />
              <Route
                path="/Closed"
                render={() => (
                  <Tickets
                    myState={this.props.myState}
                    isAdmin={this.isAdmin}
                    origin="Closed"></Tickets>
                )}
              />
              <Route
                path="/Archive"
                render={() => (
                  <Tickets
                    myState={this.props.myState}
                    origin="Archive"
                    isAdmin={this.isAdmin}>
                  </Tickets>
                )}
              />
              <Route
                path="/NewTicket"
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
             */}
          </div>
        </div>
      )
    } else {
      return (
        <div className="App-body">
          <div className="container">
            <Switch>
              <Route exact path='/'
                render={() => (<Home myState={this.props.myState} isAdmin={isAdmin}></Home>
                )}
              />
              <Route
                path="/Archive"
                render={() => (
                  <Tickets
                    myState={this.props.myState}
                    origin="Archive"
                    isAdmin={this.isAdmin}>
                  </Tickets>
                )}
              />
              <Route
                path="/NewTicket"
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
      )
    }
    /*
    return (
      // <div>
          <Route path='/' 
            render={() => (
              isAdmin ? <AdminDashboard myState={this.props.myState} isAdmin={isAdmin}></AdminDashboard> :
                <Home myState={this.props.myState} isAdmin={isAdmin}></Home>
            )}
          />
      // </div>
    )
    */
  }
}
