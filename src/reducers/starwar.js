const INITIAL_STATE = {
    planets: [],
    details: {},
    showDetails: false
}

export const starwarreducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_PLANETS':
            return {
                ...currentState,
                planets: action.payload
            }
        case 'GET_PLANET_DETAILS':
            return {
                ...currentState,
                details: action.payload
            }
        
        case 'SHOW_PLANET_DETAILS':
            return {
                ...currentState,
                showDetails: true
            }
            
        case 'HIDE_PLANET_DETAILS':
            return {
                ...currentState,
                showDetails: false
            }

        default:
            return currentState;

    }
}