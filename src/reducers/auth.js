const authReducerDefaultState = {
    authenticated: null,
    errorMessage: '' // error is sometimes interpreted as a reserved keyword in JS
};

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'AUTH_USER':
            return {
                ...state,
                authenticated: action.payload // response.data.token if authenticated, '' if not
            };
        case 'AUTH_ERROR':
            return {
                ...state,
                errorMessage: action.payload // 'Email already in use' if not authenticated
            }
        case 'AUTH_SIGNOUT':
            return authReducerDefaultState;
        default:
            return state;
    }
}