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

        case 'SETBOARDID':
            return [{
                    boardID: action.payload
                },
                ...state
            ]
        default:
            return state;
    }
}

export default boardsReducer;