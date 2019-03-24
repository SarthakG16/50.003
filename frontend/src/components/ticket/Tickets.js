import React from 'react';
//import TicketTable from './TicketTable';
import SimpleTable from './Table';
import $ from 'jquery';



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
                  "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
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
                  "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
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

