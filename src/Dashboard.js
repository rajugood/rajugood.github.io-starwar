import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchPlanets, planetDetails, hideDetails, doLogout } from './actions/actions'
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            planetDetails: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handlePlanetSelection = this.handlePlanetSelection.bind(this);
    }
    handleInputChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
        this.props.searchPlanets(value);
    }

    handlePlanetSelection(url) {
        // const planet = await fetch(url);
        // const response = await planet.json();
        // this.setState({planetDetails: response});
        this.props.planetDetails(url);
    }

    handleLogOut() {
        this.props.doLogout();
    }
    render() {
        const isLoggedIn = this.props.user.isLoggedIn;
        return (
            <div className="dashboard">
                {isLoggedIn ? (
                    <div>
                        <div className="logout">
                            <label className="login-label">
                                {this.props.user.name} <button className="btn btn-secondary" onClick={this.handleLogOut}>LogOut</button>
                            </label>
                        </div>
                        <div className="search-list">
                            <div class="input-group input-group-lg">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-lg">Search Planets</span>
                                </div>
                                <input type="text" name="planet" value={this.state.name} onChange={this.handleInputChange} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                            </div>

                            <ul className="list-group">
                                {this.props.planets.map((planet) =>
                                    <li className="list-group-item d-flex justify-content-between align-items-center" onClick={this.handlePlanetSelection.bind(this, planet.url)} key={planet.name}>
                                        {planet.name}
                                        <span class="badge badge-primary badge-pill">{planet.population}</span>
                                    </li>
                                )}
                            </ul>

                        </div>
                        <br></br>
                        <Details hideDetails={this.props.hideDetails} showDetails={this.props.showDetails} details={this.props.details} />

                    </div>
                )
                    : (<Redirect to="/login" />)}

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        planets: state.swState.planets,
        user: state.userState,
        details: state.swState.details,
        showDetails: state.swState.showDetails
    };
}


class Details extends Component {
    constructor(props) {
        super(props);
        this.handleHideDetails = this.handleHideDetails.bind(this);
    }

    handleHideDetails() {
        this.props.hideDetails();
    }
    render() {
        const overlayClass = this.props.showDetails ? 'overlay-show' : 'overlay-hidden';

        return (
            <div>
                {this.props.showDetails ? (<div>{this.props.details.name}</div>) : ('')}
                <div id="popup2" className={`overlay light ${overlayClass}`}>

                    <div className="popup">

                        <h2>{this.props.details.name}</h2>
                        <div className="content">
                            <p><strong>Rotation period: </strong> {this.props.details.rotation_period} </p>
                            <p><strong>Orbital period: </strong> {this.props.details.orbital_period} </p>
                            <p><strong>Diameter: </strong> {this.props.details.diameter} </p>
                            <p><strong>climate: </strong> {this.props.details.climate} </p>
                            <p><strong>gravity: </strong> {this.props.details.gravity} </p>
                            <p><strong>terrain: </strong> {this.props.details.terrain} </p>
                            <p><strong>surface_water: </strong> {this.props.details.surface_water} </p>
                            <p><strong>population: </strong> {this.props.details.population} </p>
                            
                        </div>
                        <br></br>
                        <button type="button" class="btn btn-secondary btn-sm" onClick={this.handleHideDetails}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, { searchPlanets, doLogout, planetDetails, hideDetails })(Dashboard);