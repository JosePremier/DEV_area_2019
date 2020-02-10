import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import React from 'react';

import PropTypes from "prop-types";
import {Redirect} from 'react-router-dom'
import api from '../api'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    noAccountLink: {
        marginTop: theme.spacing(2),
    }
});

//const classes = useStyles();


class dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;
        if (this.state.redirect) {
            return <Redirect to='/dashboard'/>;
        }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Welcome to dashboard
                </Typography>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
        )
    }
}

dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(dashboard);
