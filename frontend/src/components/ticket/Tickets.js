import React from 'react';
import $ from 'jquery';
import constants from "../../resources/strings.js";
import EnhancedTable from './EnhancedTable';

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
        console.log("I have constructed tickets list");
    }

    componentDidMount() {
        const sessionToken = localStorage.getItem("sessionToken");
        
        var settings;
        if (this.state.origin === "Home") {
            settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets?where={%22status%22%20:%20%20{%22$in%22:%20[%22Open%22,%22Pending%22,%22Closed%22]%20}%20}",
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
        else if (this.state.origin === "Archive" && this.isAdmin) {
            settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets?where={%22status%22%20:%20%20{%22$in%22:%20[%22Archive%22,%22Deleted%22]%20}%20}",
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
                "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets?where={%22status%22%20:%20%20{%22$in%22:%20[%22" + this.state.origin + "%22]%20}%20}",
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
                console.log("why ami here");
            });
        }
    }


    render() {
        console.log("I am inside tickets render");
        //console.log(this.userProfile.value);
        if (!this.state.isLoaded) {
            return <div>Loading...</div>
        }
        else {
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
                    {/* <SimpleTable myState={this.props.myState} tickets={this.state.tickets}></SimpleTable> */}
                    <EnhancedTable myState = {this.props.myState} tickets = {this.state.tickets}
                     isAdmin={this.isAdmin} origin = {this.props.origin}></EnhancedTable>
                </div>
            );
        }
    }
}

