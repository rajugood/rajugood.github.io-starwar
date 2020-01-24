import React, { Component } from 'react'

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            planets: [],
            name: '',
            planetDetails: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handlePlanetSelection = this.handlePlanetSelection.bind(this);
    }
    async handleInputChange(event) {
        const value = event.target.value;
        this.setState({name: value});
        const planets = await fetch('https://swapi.co/api/planets/?search='+event.target.value);
        const response = await planets.json();
        
        if(response.count >= 1){
            this.setState({
                planets: response.results
            });
        }
    }

    async handlePlanetSelection(url){
        const planet = await fetch(url);
        const response = await planet.json();
        this.setState({planetDetails: response});
    }

    handleLogOut(){
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('name');
    }
    render() {
        return (
            <div>
                <label>
                    LogOut <button onClick={this.handleLogOut}>LogOut</button>
                </label>
                <label> Search Planet: 
                    <input type="text" name="planet" value={this.state.name} onChange={this.handleInputChange}></input>
                </label>
                <ul>
                    {this.state.planets.map((planet) =>
                        <li onClick={this.handlePlanetSelection.bind(this, planet.url)} key={planet.name}>
                        {planet.name}
                        </li>
                    )}
                </ul>

                <br></br>
                {this.state.planetDetails !== '' ? (<span>{this.state.planetDetails.population}</span>) : ''} 
            </div>
        )
    }
}
