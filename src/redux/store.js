import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from'./reducers/userReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer
});

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, middleware);