function userReducer(state = {}, action) {
    switch (action.type) {
        case 'LOGINTOKEN':
            return {
                ...state,
                loginToken: action.payload
            };
            case 'NEWBOARD':
                return {
                    ...state,
                    
                }
        default:
            return state;
    }
}

export default userReducer;