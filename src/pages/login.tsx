import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useAuthState} from 'react-firebase-hooks/auth';
import * as firebase from "firebase";
import {withRouter} from 'react-router';
import {SnackbarProvider, VariantType, useSnackbar} from 'notistack';
import LinearProgress from "@material-ui/core/LinearProgress";

import { oc } from 'ts-optchain';

const useStyles = makeStyles(theme => ({
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
}));


export default withRouter((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const [user, setUser] = useState<firebase.User | null>(null)
    const [load, setLoad] = useState(true)
    console.log('signin page')

    useEffect(() => {
        console.log('useEffect')
        firebase.auth().onAuthStateChanged(user => {
            setUser(user)
            setLoad(false)
            if(oc(user).uid()){
                props.history.push('/')
            }
        })
    }, [])

    const classes = useStyles();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <Container component="main" maxWidth="xs">
            {load && <LinearProgress/>}
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <div className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                            try {
                                const result = await firebase.auth().signInWithEmailAndPassword(email, password);
                                console.log(result)
                            } catch (err) {
                                enqueueSnackbar(err.message, {variant: 'error'});

                            }
                        }
                        }
                        className={classes.submit}
                    >
                        Sign In
                    </Button>

                </div>
            </div>
        </Container>
    );
})
