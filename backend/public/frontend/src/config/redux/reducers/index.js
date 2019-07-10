import userReducer from './user.js';
import boardsReducer from './boards.js';

import { combineReducers } from 'redux';

export default combineReducers( {
    userReducer,
    boardsReducer,
} )
