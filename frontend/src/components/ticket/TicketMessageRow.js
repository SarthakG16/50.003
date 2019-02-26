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
        marginTop: theme.spacing.unit *2,
        spacing: theme.spacing.unit * 2,
    },
});

class TicketMessageRow extends React.Component {

    render() {
        console.log('displaying individual messages');
        return (
            <React.Fragment>
                <p>

                </p>
                <div>
                    <Paper elevation={5}>
                        <Typography align="left" variant="subtitle1">
                            User: {this.props.location.state.ticket.message}
                        </Typography>
                    </Paper>
                </div>
            </React.Fragment>


        );
    }
}

export default withStyles(styles)(TicketMessageRow);

TicketMessageRow.propTypes = {
    message: PropTypes.object.isRequired
}