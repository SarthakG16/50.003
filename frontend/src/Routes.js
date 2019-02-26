import React from 'react';
import {Router, Switch, Route} from "react-router-dom";
import Login from "./components/pages/Login";
import NewTicket from "./components/ticket/NewTicket"
import Home from './components/pages/Home';
import FAQ from './components/pages/FAQ';
import TicketThread from './components/ticket/TicketThread';

const Routes = () => (
    <main>
        <Switch>
           <Route component={Home}/>
           <Route path="/login" component={Login} />
           <Route path="/NewTicket" component={NewTicket}/>
           <Route path="/FAQ" component={FAQ}/>
           <Route path="/Ticket/:id" component={TicketThread}/>
        </Switch>
    </main>
)

export default Routes;