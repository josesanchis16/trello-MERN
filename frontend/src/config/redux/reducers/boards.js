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
            const boardList = state[0].boardID;
            return state.map((board, index) => {
                if (board._id === boardList) {
                    return action.payload
                }
                return state[index];
            });
        case 'NEWTASK':
            const boardTask = state[0].boardID;
            return state.map((board, index) => {
                if (board._id === boardTask) {
                    board.listas.map((lista, index) => {
                        if (lista._id === action.listId) {
                            lista.tareas.push(action.payload);
                            return;
                        }
                        return board.listas[index];
                    });
                }
                return state[index];
            });
        default:
            return state;
    }
}

export default boardsReducer;