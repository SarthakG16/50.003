import React from 'react';
import $ from 'jquery';
import constants from "../../resources/strings.js";
import EnhancedTable from './EnhancedTable';
import { Typography } from '@material-ui/core';

export default class Tickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: this.props.origin,
            tickets: [],
            isLoaded: false,
        };
        this.isAdmin = props.isAdmin;
        this.userProfile = props.myState.userProfile.registerCallback(this);
        // this.userProfile = props.myState.userProfile;
        // console.log("I have constructed tickets list");
        this.lastOrigin = null;
    }

    getTickets(origin) {
        const sessionToken = localStorage.getItem("sessionToken");

        this.setState({
            isLoaded: false,
            tickets: null
        })

        var settings;
        if (origin === "Home") {
            settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets?where={%22status%22%20:%20%20{%22$in%22:%20[%22Open%22,%22Pending%22,%22Closed%22]%20}%20}&order=-updatedAt",
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Server-Token": constants.serverToken,
                    "cache-control": "no-cache",
                    "X-Parse-Session-Token": sessionToken,
                },
                "processData": false,
                "data": ""
            }

            $.ajax(settings).done((response) => {
                this.setState({
                    isLoaded: true,
                    tickets: response.results
                })
            });

        }
        else if (origin === "Archive" && this.isAdmin) {
            settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets?where={%22status%22%20:%20%20{%22$in%22:%20[%22Archive%22,%22Deleted%22]%20}%20}&order=-updatedAt",
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Server-Token": constants.serverToken,
                    "cache-control": "no-cache",
                    "X-Parse-Session-Token": sessionToken,
                },
                "processData": false,
                "data": ""
            }

            $.ajax(settings).done((response) => {
                this.setState({
                    isLoaded: true,
                    tickets: response.results
                })
            });

        }
        else {
            settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets?where={%22status%22%20:%20%20{%22$in%22:%20[%22" + origin + "%22]%20}%20}&order=-updatedAt",
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Server-Token": constants.serverToken,
                    "cache-control": "no-cache",
                    "X-Parse-Session-Token": sessionToken,
                },
                "processData": false,
                "data": ""
            }

            $.ajax(settings).done((response) => {
                this.setState({
                    isLoaded: true,
                    tickets: response.results
                })
            });
        }
    }


    render() {
        if (this.lastOrigin != this.props.origin) {
            this.getTickets(this.props.origin);
            this.lastOrigin = this.props.origin;
        }

        // console.log("I am inside tickets render");
        //console.log(this.userProfile.value);
        if (!this.state.isLoaded) {
            return <div>
                    <Typography align="center">
                        Loading...
                    </Typography>
                    </div>
        }
        else {
            while(!this.state.isLoaded);
            if (this.state.tickets.length === 0) {
                return (
                    <div>
                        <p>
                            No Tickets Found
                        </p>
                    </div>
                )
            }
            return (
                <div>
                    <EnhancedTable myState={this.props.myState} tickets={this.state.tickets}
                        isAdmin={this.isAdmin} origin={this.props.origin}></EnhancedTable>
                </div>
            );
        }
    }
}

