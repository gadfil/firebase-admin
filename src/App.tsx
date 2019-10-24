import React, {useState, useEffect} from 'react';
import './App.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import * as firebase from "firebase";
import {BrowserRouter, Switch, Route, Router} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"
import Login from "./pages/login"
import Main from "./pages/main"
import {SnackbarProvider, VariantType, useSnackbar} from 'notistack';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useAuth} from "./hooks/auth";
export const browserHistory = require("history").createBrowserHistory();


const App: React.FC = () => {

    const[user, setUser]= useState<firebase.User|null>(null)
    const [ load, setLoad] = useState(true)

    useEffect(() =>{
        firebase.auth().onAuthStateChanged(user=>{setUser(user)
        setLoad(false)})
    },[])
    if (load) {
        return (      <LinearProgress />
        )
    }

    return (
        <SnackbarProvider maxSnack={3}  anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}>
            <Router history={browserHistory}>


            <BrowserRouter>
                <Switch>
                    <PrivateRoute user = {user} path="/" component={Main} exact/>
                    <Route path="/signin" component={Login}/>


                </Switch>
            </BrowserRouter>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
