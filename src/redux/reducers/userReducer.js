import {
    FETCH_ALL_USERS,
    FETCH_USER_BY_ID,
    FETCH_USER_BY_EMAIL,
    LOADING
} from '../actions/userAction';

const initialState = {
    allUsers: [],
    userData: {},
    loading: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
                loading: false
            }
        case FETCH_USER_BY_ID:
            return {
                ...state,
                userData: action.payload,
                loading: false
            }
        case FETCH_USER_BY_EMAIL:
            return {
                ...state,
                userData: action.payload,
                loading: false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
    }
    return state;
};