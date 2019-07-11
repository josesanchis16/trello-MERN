function boardsReducer(state = [], action) {
    switch (action.type) {
        case 'LOADBOARDS':
            return [
                ...action.payload
            ];

        case 'NEWBOARD':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
}

export default boardsReducer;