import {
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAIL,
    LOGIN_ADMIN_SUCCESS,
    LOGIN_ADMIN_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    LOADING
} from '../actions/authAction';

const initialState = {
    user: {},
    error: {},
    loading: 'idle',
    errorMessage: '',
    message: ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_ADMIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: 'success'
            };
        case REGISTER_ADMIN_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                errorMessage: action.payload
            };
        case LOGIN_ADMIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: 'success'
            };
        case LOGIN_ADMIN_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                errorMessage: action.payload
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: 'success'
            }
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                errorMessage: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: 'loading'
            }
        default:
            return state;
    };
}