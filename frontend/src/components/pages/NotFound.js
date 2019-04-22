import React from 'react';
import { Button, Grid, MenuItem, TextField, Typography } from '@material-ui/core';

export default class NotFound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // redirect: false,
            // status: null,

        }
        // this.userProfile = props.myState.userProfile.registerCallback(this);
        // this.isAdmin = props.isAdmin;
        console.log("Not valid page");
        // console.log(this.userProfile.value);

        //this.handleClick = this.handleClick.bind(this);
    }

    redirectToHome(){
        window.location.replace("/");
        return;
    }


    render() {
        return (
            <div>
                <div style={{paddingBottom:30}}>
                    <Typography align="center" variant="title">
                        Opps! The page you have requested is not found.
                </Typography>
                </div>
                <div align="center">
                    <Button
                        variant="contained"
                        id="return_home"
                        onClick={this.redirectToHome.bind()}
                    >
                        Return to home
                    </Button>
                </div>
            </div>
        );
    }
}

