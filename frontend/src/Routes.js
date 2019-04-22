import React from 'react';
import {Route } from "react-router-dom";
import Home from './components/pages/Home';
import AdminDashboard from './components/pages/AdminDashboard';
import $ from 'jquery';
import constants from "./resources/strings.js";

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
    return (
      <div>
          <Route path='/' 
            render={() => (
              isAdmin ? <AdminDashboard myState={this.props.myState} isAdmin={isAdmin}></AdminDashboard> :
                <Home myState={this.props.myState} isAdmin={isAdmin}></Home>
            )}
          />
      </div>
    )
  }
}
