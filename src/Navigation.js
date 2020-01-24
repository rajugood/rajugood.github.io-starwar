import React from "react";
import {
    BrowserRouter as Router,
    HashRouter,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Login from './Login';
import Dashboard from './Dashboard';

export default function Authenticate() {
    return (
        <HashRouter basename="/">
            <Switch>
                <ValidateSession path="/login">
                    <Login />
                </ValidateSession>
                <ValidateLogin path="/dashboard">
                    <Dashboard />
                </ValidateLogin>
            </Switch>
        </HashRouter>
    );
}

function ValidateSession({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={() =>
                sessionStorage.getItem('login') !== 'true' ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/dashboard"
                            }}
                        />
                    )
            }
        />
    );
}

function ValidateLogin({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={() =>
                sessionStorage.getItem('login') === 'true' ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login"
                            }}
                        />
                    )
            }
        />
    );
}