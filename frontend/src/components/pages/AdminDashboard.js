import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Grid, Card, Typography, CardActionArea } from '@material-ui/core';

// values of status
const STATUS_VALUES = {
    PENDING: 'Pending',
    OPEN: 'Open',
}

export default class AdminDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            status: null,
        }
        //this.handleClick = this.handleClick.bind(this);
    }

    handleClick(status) {
        console.log("Clicked " + status);
        if (status === "Pending") {
            console.log("Pending");
            this.setState({
                redirect: true,
                status: "Pending"
            });

        }
        if (status === 'Open') {
            console.log("Open");
            this.setState({
                redirect: true,
                status: "Open"
            });
        }
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: `/` + this.state.status, }} push={true}></Redirect>;
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    {this.renderRedirect()}
                    <Route exact path="/AdminHome" render={props => (
                        <React.Fragment>
                            <p>Tickets</p>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                spacing={16}
                                alignItems="center"
                            >
                                <Grid item xs>
                                    <Card>
                                        <CardActionArea
                                            onClick={this.handleClick.bind(this, STATUS_VALUES.OPEN)}
                                        >
                                            <Typography
                                                style={{ paddingTop: 50, paddingBottom: 50 }}
                                            >
                                                Open
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>

                                <Grid item xs>
                                    <Card>
                                        <CardActionArea
                                            onClick={this.handleClick.bind(this, STATUS_VALUES.PENDING)}
                                        >
                                            <Typography
                                                style={{ paddingTop: 50, paddingBottom: 50 }}
                                            >
                                                Pending
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>

                                <Grid item xs>
                                    <Card>
                                        <CardActionArea>
                                            <Typography
                                                style={{ paddingTop: 50, paddingBottom: 50 }}
                                            >
                                                Something?
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Grid>
                            {/* <Tickets origin = "Home"></Tickets> */}
                        </React.Fragment>
                    )} />

                    {/* <Route
                        path="/Pending"
                        render={(origin) => (
                            <Tickets origin="Pending"></Tickets>
                        )}
                    />

                    <Route
                        path="/Open"
                        render={(origin) => (
                            <Tickets origin="Open"></Tickets>
                        )}
                    /> */}
                </div>
            </div>
        );
    }
}

