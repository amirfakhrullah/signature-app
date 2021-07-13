import {
    FETCH_ALL_USERS,
    FETCH_USER_BY_ID,
    FETCH_USER_BY_EMAIL,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    LOADING,
    FAIL
} from '../actions/userAction';

const initialState = {
    allUsers: [],
    userData: {},
    userEditData: {},
    status: 'idle',
    message: '',
    errorMessage: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {

    // eslint-disable-next-line default-case
    switch (action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload && action.payload,
                status: 'succeed'
            }
        case FETCH_USER_BY_ID:
            return {
                ...state,
                userEditData:  action.payload,
                status: 'succeed'
            }
        case FETCH_USER_BY_EMAIL:
            return {
                ...state,
                userData:  action.payload,
                status: 'succeed'
            }
        case CREATE_USER:
            return {
                ...state,
                message: action.payload && action.payload.message,
                errorMessage: '',
                status: 'succeed'
            }
        case UPDATE_USER:
            return {
                ...state,
                message: action.payload && action.payload.message,
                errorMessage: '',
                status: 'succeed'
            }
        case DELETE_USER:
            return {
                ...state,
                message: action.payload && action.payload.message,
                errorMessage: '',
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
                status: 'failed',
                errorMessage: action.payload ? action.payload.message : 'Result Not Found',
                message: ''
            }
    }
    return state;
};