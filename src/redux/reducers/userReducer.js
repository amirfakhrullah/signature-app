import {
    FETCH_ALL_USERS,
    FETCH_USER_BY_ID,
    FETCH_USER_BY_EMAIL,
    LOADING,
    FAIL
} from '../actions/userAction';

const initialState = {
    allUsers: [],
    userData: {},
    status: 'idle'
};

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
                status: 'succeed'
            }
        case FETCH_USER_BY_ID:
            return {
                ...state,
                userData: action.payload,
                status: 'succeed'
            }
        case FETCH_USER_BY_EMAIL:
            return {
                ...state,
                userData: action.payload,
                status: 'succeed'
            }
        case LOADING:
            return {
                ...state,
                status: 'loading'
            }
        case FAIL:
            return {
                ...state,
                status: 'failed'
            }
    }
    return state;
};