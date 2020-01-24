const INITIAL_STATE = {
    isLoggedIn: false,
    isLoginError: false,
    name: ''
}

export const userreducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...currentState,
                isLoggedIn: true,
                isLoginError: false,
                name: action.payload.name
            }
        case 'LOGOUT':
            return {
                ...currentState,
                isLoggedIn: false,
                isLoginError: false,
                name: ''
            }
        case 'LOGIN_FAIL':
            return {
                ...currentState,
                isLoggedIn: false,
                isLoginError: true,
            }

        default:
            return currentState;

    }
}