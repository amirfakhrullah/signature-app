import {
    FETCH_ALL_USERS,
    FETCH_USER_BY_ID,
    FETCH_USER_BY_EMAIL
} from '../actions/userAction';

const initialState = {
    allUsers: [],
    userData: {}
};

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }
        case FETCH_USER_BY_ID:
            return {
                ...state,
                userData: action.payload
            }
        case FETCH_USER_BY_EMAIL:
            return {
                ...state,
                userData: action.payload
            }
    }
    return state;
};