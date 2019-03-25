import React from 'react';
//import TicketTable from './TicketTable';
import SimpleTable from './Table';
import $ from 'jquery';
import constants from "../../resources/strings.js";



export default class Tickets extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            origin: this.props.origin,
            tickets: [],
            isLoaded: false
        };
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
                },
                "processData": false,
                "data": ""
              }
              
              $.ajax(settings).done((response) => {
                this.setState({
                    isLoaded:true,
                    tickets:response.results
                })
              });

        } else {
            settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets?where={%22status%22%20:%20%22Archive%22%20}",
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Server-Token": constants.serverToken,
                    "cache-control": "no-cache",
                },
                "processData": false,
                "data": ""
              }
              
              $.ajax(settings).done((response) => {
                this.setState({
                    isLoaded:true,
                    tickets:response.results
                })
              });
        }

    }

    
    render() {
        if(!this.state.isLoaded) {
            return <div>Loading...</div>
        }
        else {
        return (
            <div>
                <SimpleTable tickets={this.state.tickets}></SimpleTable>
            </div>
        );
    }
    }
}

