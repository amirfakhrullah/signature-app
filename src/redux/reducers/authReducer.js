import {
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAIL,
    LOGIN_ADMIN_SUCCESS,
    LOGIN_ADMIN_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    GET_ADMINS_SUCCESS,
    GET_ADMINS_FAIL,
    GET_ADMIN_BY_ID_SUCCESS,
    GET_ADMIN_BY_ID_FAIL,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_FAIL,
    LOADING
} from '../actions/authAction';

const initialState = {
    user: {},
    allAdmins: [],
    adminData: {},
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
                loading: 'success',
                message: 'Admin registered succesfully',
                errorMessage: ''
            };
        case REGISTER_ADMIN_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                message: '',
                errorMessage: action.payload.message
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
                message: '',
                errorMessage: action.payload.message
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                errorMessage: '',
                loading: 'success'
            }
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                message: '',
                errorMessage: action.payload.message
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                errorMessage: '',
                loading: 'success'
            }
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                message: '',
                errorMessage: action.payload.message 
            }
        case GET_ADMINS_SUCCESS:
            return {
                ...state,
                allAdmins: action.payload,
                errorMessage: '',
                loading: 'success'
            }
        case GET_ADMINS_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                message: '',
                errorMessage: action.payload.message
            }
        case GET_ADMIN_BY_ID_SUCCESS:
            return {
                ...state,
                adminData: action.payload,
                loading: 'success'
            }
        case GET_ADMIN_BY_ID_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                message: '',
                errorMessage: 'No Admin Found'
            }
        case DELETE_ADMIN_SUCCESS:
            return {
                ...state,
                errorMessage: '',
                message: action.payload.message,
                loading: 'success'
            }
        case DELETE_ADMIN_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                message: '',
                errorMessage: action.payload.message
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