import {
    strictEqual
} from "assert";

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
            ];
        case 'NEWLIST':
            const boardId = state[0].boardID;
            return state.map((board, index) => {
                if (board._id === boardId) {
                    return action.payload
                }
                return state[index];
            });
        default:
            return state;
    }
}

export default boardsReducer;