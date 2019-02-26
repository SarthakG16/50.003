import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        spacing: theme.spacing.unit *2,
    },
});

class TicketThread extends React.Component {

    render() {
        console.log('inside a thread');
        return (
            <React.Fragment>
                <div>
                    <Paper elevation={10} spacing='100px'>
                        <Typography align="left" variant="subtitle1">
                            Ticket ID: {}
                        </Typography>
                        <Typography align="left" variant="headline">
                            Title: {}
                        </Typography>
                        <Typography align="left" variant="caption">
                            Timestamp: {}   Status: {}
                        </Typography>
                    </Paper>
                    
                </div>
                <p>
                    yay inside a thread!
                </p>
            </React.Fragment>


        );
    }
}

export default withStyles(styles)(TicketThread);
// TicketThread.propTypes = {
//     ticket: PropTypes.object.isRequired
// }