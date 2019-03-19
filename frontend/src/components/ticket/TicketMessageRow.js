import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountIcon from '@material-ui/icons/AccountCircle';

// const styles = theme => ({
//     root: {
//         ...theme.mixins.gutters(),
//         paddingTop: theme.spacing.unit * 2,
//         paddingBottom: theme.spacing.unit * 2,
//         marginTop: theme.spacing.unit *2,
//         spacing: theme.spacing.unit * 2,
//     },
// });

const styles = theme => ({
    root: {
                ...theme.mixins.gutters(),
                paddingTop: theme.spacing.unit * 2,
                paddingBottom: theme.spacing.unit * 2,
                marginTop: theme.spacing.unit *2,
                spacing: theme.spacing.unit * 2,
    },

    // paper: {
    //   padding: theme.spacing.unit * 10,
    //   margin: 'auto',
    //   height: '100%'
    //   maxWidth: 100,
    // },
    // image: {
    //   width: 128,
    //   height: 128,
    // },
    // img: {
    //   margin: 'auto',
    //   display: 'block',
    //   maxWidth: '100%',
    //   maxHeight: '100%',
    // },
  });
  

class TicketMessageRow extends React.Component {

    constructor(props) {
        super(props);
        console.log("inside Tticket messages now, will start displaying messages");
        this.state = {
        };
    }

    render() {
        console.log('displaying individual messages');
        return (
            <React.Fragment>
                <div>
                    <Grid container direction="row" justify="space-between" spacing={16}>
                        <Grid item xs>
                            <Paper elevation={2}
                                style={{ paddingTop: 10, paddingBottom: 10, height:100}}>
                                <Grid container direction="column" justify="center" alignItems="center" spacing={8}>
                                    <Grid item xs>
                                        <AccountIcon/>
                                    </Grid>
                                    <Grid item xs>
                                        {this.props.user}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={10}>
                            <Paper elevation={2}
                                style={{ paddingTop: 10, paddingBottom: 10, height:100 }}>
                                <Typography algin="left">
                                    {this.props.message}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TicketMessageRow);

TicketMessageRow.propTypes = {
    user: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}