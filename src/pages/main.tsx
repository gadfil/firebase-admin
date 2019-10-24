import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as firebase from "firebase";
import {withRouter} from 'react-router';

export default withRouter((props) =>{
    const [user, loading, error] = useAuthState(firebase.auth());
    return(<div>main{user?user.email:''} <button onClick={() =>firebase.auth().signOut()} >logout</button></div>)
})
