function userReducer(state = {}, action) {
    switch (action.type) {
        case 'LOGINTOKEN':
            return {
                ...state,
                loginToken: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;