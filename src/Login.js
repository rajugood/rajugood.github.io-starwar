import React, { Component } from 'react'
import { connect } from 'react-redux';
import { doLogin } from './actions/actions'
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        this.props.doLogin(this.state.name, this.state.password);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const isLoggedIn = this.props.user.isLoggedIn;
        return (
            <React.Fragment>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h2>Application Login Page</h2>
                        <p>Login from here to access.</p>
                    </div>
                </div>
                {isLoggedIn === false ? (
                    <div className="main">
                        <div class="login-form">
                            <form>
                                <label className="login-label">User Name: </label><input className="form-control" type="text" value={this.state.name} onChange={this.handleInputChange} name="name" />

                                <label className="login-label">Password: </label><input className="form-control" type="password" value={this.state.password} onChange={this.handleInputChange} name="password" />
                                <br />
                                <button className="btn btn-primary" onClick={this.handleLogin}>Submit</button>
                                {this.props.user.isLoginError ? (<span>Please provide valid username and password!</span>) : ''}
                            </form>
                        </div>

                    </div>
                ) : (<Redirect to="/dashboard" />)}

            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userState
    };
}

export default connect(mapStateToProps, { doLogin })(Login);