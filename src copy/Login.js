import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isLoginError: false,
            name: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async handleLogin() {
        const peoples = await fetch('https://swapi.co/api/people/?search='+this.state.name);
        const response = await peoples.json();
        if(response.count === 1 && response.results[0].birth_year === this.state.password){
            sessionStorage.setItem('name', this.state.name);
            sessionStorage.setItem('login', true);
            this.setState({ isLoggedIn: true, isLoginError: false });
        }else{
            this.setState({ isLoginError: true });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            isLoginError: false
        });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div>
            {  isLoggedIn === false  ? (
                <div>
                    <label >Name: <input type="text" value={this.state.name} onChange={this.handleInputChange} name="name" />
                    </label>
                    <label>Password: <input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" /></label>
                    <button onClick={this.handleLogin}>Submit</button>
                    { this.state.isLoginError ? (<span>Please provide valid username and password!</span>) : ''}
                </div>
            ) : (<Redirect to="/dashboard" />) }
            </div>
        )
    }
}


