import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login'
//import FAQ from './FAQ';
import NewTicket from "../ticket/NewTicket"
import Tickets from '../ticket/Tickets';
import TicketThread from '../ticket/TicketThread'
import { Grid, Card, Typography, CardActionArea} from '@material-ui/core';  

export default class AdminDashboard extends React.Component {

	render() {
		return (
            <div className="App">
				<div className="container">
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
                                        <CardActionArea>
                                            <Typography
                                                style={{paddingTop: 50, paddingBottom: 50 }}
                                                >
                                                Open
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>

                                <Grid item xs>
                                    <Card>
                                        <CardActionArea>
                                            <Typography
                                                style={{paddingTop: 50, paddingBottom: 50 }}
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
                                                style={{paddingTop: 50, paddingBottom: 50 }}
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
  						path="/Archive"
  						render={(origin) => (
							<Tickets origin = "Archive"></Tickets>
						  )}
						/>
					<Route path="/NewTicket" component={NewTicket} />
					<Route path="/login" component={Login} />
					<Route path="/Ticket" component={TicketThread}/> */}
				</div>
			</div>
    );
  }
}

