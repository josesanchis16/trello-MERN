function boardsReducer(state = [], action) {
    switch (action.type) {
        case 'NEWBOARD':
            return {
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