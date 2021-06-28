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

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {

    // eslint-disable-next-line default-case
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