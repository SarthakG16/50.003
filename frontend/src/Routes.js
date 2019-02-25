import React from 'react';
import {Switch, Route} from "react-router-dom";
import Login from "./components/pages/Login";
import NewTicket from "./components/ticket/NewTicket"
import Home from './components/pages/Home';

const Routes = () => (
    <main>
        <Switch>
           <Route component={Home}/>
           <Route path="/login" component={Login} />
           <Route path="/NewTicket" component={NewTicket}/>
        </Switch>
    </main>
)

export default Routes;