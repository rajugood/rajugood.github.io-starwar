export const searchPlanets = (search) => async (dispatch) => {
    try {
        const response = await fetch('https://swapi.co/api/planets/?search=' + search);
        const data = await response.json();
        dispatch({ 'type': 'FETCH_PLANETS', 'payload': data.results });
    }
    catch (error) {
        dispatch({ 'type': 'FETCH_PLANETS_FAILED' })
    }
}

export const planetDetails = (url) => async (dispatch) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ 'type': 'GET_PLANET_DETAILS', 'payload': data });
        dispatch({ 'type': 'SHOW_PLANET_DETAILS' });
    }
    catch (error) {
        dispatch({ 'type': 'GET_PLANET_DETAILS_FAILED' })
    }
}


export const hideDetails = () =>  (dispatch) => {

    dispatch({ 'type': 'HIDE_PLANET_DETAILS' });
}

export const doLogin = (username, password) => async (dispatch) => {
    try {
        const response = await fetch('https://swapi.co/api/people/?search=' + username);
        const data = await response.json();

        if(data.count === 1 && data.results[0].birth_year === password){
            sessionStorage.setItem('name', username);
            sessionStorage.setItem('login', true);
            dispatch({ 'type': 'LOGIN_SUCCESS', 'payload': data.results[0] });
        }else{
            dispatch({ 'type': 'LOGIN_FAIL' })
        }
        
    }
    catch (error) {
        dispatch({ 'type': 'LOGIN_FAIL' })
    }
}

export const doLogout = (username, password) =>  (dispatch) => {
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('name');
    dispatch({ 'type': 'LOGOUT'});
}



