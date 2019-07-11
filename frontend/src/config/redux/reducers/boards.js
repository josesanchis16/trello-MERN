function boardsReducer(state = {boards:[]}, action) {
    switch (action.type) {
        case 'NEWBOARD':
            console.log(state);
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