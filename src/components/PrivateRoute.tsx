import React, {Component, FC, ComponentType} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import * as firebase from "firebase";
import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>;

}

//@ts-ignore
const PrivateRoute = ({user, ...rest}) => {

    console.log('PrivateRoute',user)
    if(user) return( <Route {...rest}/>)

    return <Redirect to="/signin"/>
    // return (
    //
    //     // Show the component only when the user is logged in
    //     // Otherwise, redirect the user to /signin page
    //     <Route {...rest} render={props => {
    //         return (<Redirect to="/signin"/>)
    //     }} />
    // );
};

export default PrivateRoute
