function boardsReducer(state = {}, action) {
    switch (action.type) {
        case 'NEWBOARD':
            return {
                ...state,
                boards: [
                    ...state.boards,
                    action.payload
                ]
            };
        default:
            return state;
    }
}

export default boardsReducer;