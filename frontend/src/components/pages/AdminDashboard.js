import React from 'react';
//import { Route, Redirect, Switch } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Grid, Card, Typography, CardActionArea } from '@material-ui/core';
import NewTicket from "../ticket/NewTicket"
import Tickets from '../ticket/Tickets';
import TicketThread from '../ticket/TicketThread'


export default class AdminDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            status: null,

        }
        this.isAdmin = props.isAdmin;
        this.userProfile = props.myState.userProfile.registerCallback(this);
        console.log("I have constructed admin dashboard");
        // console.log(this.userProfile.value);

        //this.handleClick = this.handleClick.bind(this);
    }

    render() {
        console.log("I am inside admin dashboard render");
        // console.log(this.userProfile.value);
        return (
            <div className="App-body">
                <div className="container">
                    <Route exact path="/" render={props => (
                        <React.Fragment>
                            <h3 align="center">Categories</h3>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                spacing={32}
                                alignItems="center"
                            >
                                <Grid item xs>
                                    <Card>
                                        <CardActionArea
                                            component={Link} to="/Open"
                                        >
                                            <Typography
                                                style={{ paddingTop: 50, paddingBottom: 50}}
                                                align="center"
                                            >
                                                Open
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>

                                <Grid item xs>
                                    <Card>
                                        <CardActionArea
                                            component={Link} to="/Pending"
                                        >
                                            <Typography
                                                style={{ paddingTop: 50, paddingBottom: 50 }}
                                                align="center"
                                            >
                                                Pending
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>

                            </Grid>
                            {/* <Tickets origin = "Home"></Tickets> */}
                        </React.Fragment>
                    )} />
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
                        path="/Archive"
                        render={() => (
                            <Tickets
                                myState={this.props.myState}
                                isAdmin={this.isAdmin}
                                origin="Archive"></Tickets>
                        )}
                    />
                    <Route
                        path="/NewTicket"
                        render={() => (
                            <NewTicket
                                myState={this.props.myState}>
                            </NewTicket>
                        )}
                    />
                    <Route path="/Ticket" component={TicketThread} />
                </div>
            </div>
        );
    }
}

