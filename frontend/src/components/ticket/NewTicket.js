import React from "react";
//import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
//import $ from 'jquery';

const RESET_VALUES = {
    category: '',
    message: '',
    title: '',
    email: '',
    status:'Open'
};
// var request = require("request");

// const RESET_VALUES_MESSAGE = { name: '', message: '', date: ''};

export default class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            ticket: Object.assign({}, RESET_VALUES),
            //errors: { title: '', message: '', category: '' },
        };
    }

    // returns the date and time the reply was posted in UTC
    getDateCreated(){
        var today = new Date();
        console.log(today);
        return today.toUTCString();
    }

    addTicket(e) {

        // setting up the body
        let data = {
            title: e.title,
            category: e.category,
            replies:[
                        {
                            name: "User1",
                            message: e.message,
                            date: this.getDateCreated()
                        }

                    ],
            status:'Open',
            email: e.email
        }
        console.log(data);
        
        fetch('https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
                    "cache-control": "no-cache",
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

        
    }

    handleSubmit(e) {
        console.log('clicked submit');
        let ticketVaild = this.handleValidation(e);
        console.log('finish checking');

        if (ticketVaild) {
            //this.addTicket(e);
            console.log(JSON.stringify(e));
            this.addTicket(e);
            alert("Ticket has been created.")

            //send notification
            this.sendNotif(e);

            // window.location.herf = '/';
            this.props.history.push('/');
            // reset the form values to blank after submitting:
            this.setState({
                ticket: Object.assign({}, RESET_VALUES),
            });
            
            return;
            // this.props.history.push('/');
            //return <Redirect to='/' push={true}></Redirect>;
        } else {
            alert("Please fill in all the required fills.");
            return;
        }
        // prevent the form submit event from triggering an HTTP Post:
        // e.preventDefault();

    }

    handleValidation(e) {
        let ticket = e;
        if (ticket.title === '') {
            console.log('No title');
            return false;
        }
        else if (ticket.category === '') {
            console.log('No category');
            return false;
        }
        else if (ticket.message === '') {
            console.log('No message');
            return false;
        }
        else if (ticket.email === ''){
            console.log('No email');
            return false;
        }
        return true;
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => {
            prevState.ticket[name] = value;
            return { ticket: prevState.ticket };
        });
    }

    //need help
    sendNotif(e){
        let emailBody = {
            "subject":"test subject using ACNAPI",
            "sender":"sarthakganoorkar@gmail.com",
            "recipient": e.email,
            "html": "<h1>HELLO!</h1>"
        }
        console.log(emailBody);
        console.log(JSON.stringify(emailBody));

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + "https://ug-api.acnapiv3.io/swivel/email-services/api/mailer",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
                    "cache-control": "no-cache"
                },
                body: JSON.stringify(emailBody)
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

        /*
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://ug-api.acnapiv3.io/swivel/email-services/api/mailer",
            "method": "POST",
            "headers": {
                "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
                "Content-Type": "application/json",
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": JSON.stringify(emailBody)
          }
          
          $.ajax(settings).done(function (response) {
            console.log("Email sent");
          });*/

        //   var options2 = {
        //     method: "POST",
        //     url: "https://ug-api.acnapiv3.io/swivel/email-services/api/mailer",
        //     headers: {
        //       "cache-control": "no-cache",
        //       "Content-Type": "application/json",
        //       "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
        //     },
        //     body: {
        //       subject: "New issue added by ",
        //       sender: "ZhiYao@mymail.accenture.com",
        //       recipient: "jhyeep@gmail.com",
        //       html:
        //         "<h3>" +
        //         "There is a new issue: " +
        //         " posted by " +
        //         "</h3></h3>" +
        //         " Content of the issue is " +
        //         "</h3>"
        //     },
        //     json: true
        //   };
        //   request(options2, function(error, response, body) {
        //     if (error) throw new Error(error);
        //     console.log(body);
        //   });
    }


    render() {
        return (
            <div className="App">
                <div className="container">
                    <Route exact path="/NewTicket" render={props => (
                        <React.Fragment>
                            <form name="ticketForm">
                                <h3>Submit a new ticket request</h3>
                                <p>
                                    <label>
                                        Title
                                        <br />
                                        <input
                                            type="text"
                                            name="title"
                                            onChange={this.handleChange}
                                            value={this.state.ticket.name}
                                            required="required"
                                        />
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        Category
                                        <br />
                                        <input
                                            type="text"
                                            name="category"
                                            onChange={this.handleChange}
                                            value={this.state.ticket.category}
                                            required="required"
                                        />
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        Message
                                        <br />
                                        <input style={boxStyle}
                                            type="text"
                                            name="message"
                                            onChange={this.handleChange}
                                            value={this.state.ticket.message}
                                            required="required"
                                        />
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        Email
                                        <br />
                                        <input
                                            type="text"
                                            name="email"
                                            onChange={this.handleChange}
                                            value={this.state.ticket.email}
                                            required="required"
                                        />
                                    </label>
                                </p>
                                <input
                                    type="submit"
                                    value="Save"
                                    onClick={this.handleSubmit.bind(this, this.state.ticket)}
                                />
                            </form>
                        </React.Fragment>
                    )} />
                </div>
            </div>

        );
    }
}

// // PropTypes
// NewTicket.propTypes = {
// 	addTicket: PropTypes.func.isRequired
// }

const boxStyle = {
    textAlign: 'left',
    padding: '10px',
    width: '200px',
    height: '20px',

}