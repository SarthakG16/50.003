import React from 'react';
//import TicketTable from './TicketTable';
import SimpleTable from './Table';
import $ from 'jquery';
import constants from "../../resources/strings.js";

const sessionToken = localStorage.getItem("sessionToken");


export default class Tickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: this.props.origin,
            tickets: [],
            isLoaded: false,
        };

        this.userProfile = props.myState.userProfile.registerCallback(this);
        console.log("I have constructed admin dashboard");
        // console.log(this.state.user);
    }

    componentDidMount() {
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
            });
        }
    }


    render() {
        console.log("I am inside tickets render");
        // console.log(this.userProfile.value);
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
                    <SimpleTable myState={this.props.myState} tickets={this.state.tickets}></SimpleTable>
                </div>
            );
        }
    }
}

