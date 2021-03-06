export const REGISTER_ADMIN_SUCCESS = 'REGISTER_ADMIN_SUCCESS';
export const REGISTER_ADMIN_FAIL = 'REGISTER_ADMIN_FAIL';
export const LOGIN_ADMIN_SUCCESS = 'LOGIN_ADMIN_SUCCESS';
export const LOGIN_ADMIN_FAIL = 'LOGIN_ADMIN_FAIL';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';
export const GET_ADMINS_SUCCESS = 'GET_ADMINS_SUCCESS';
export const GET_ADMINS_FAIL = 'GET_ADMINS_FAIL';
export const GET_ADMIN_BY_ID_SUCCESS = 'GET_ADMIN_BY_ID_SUCCESS';
export const GET_ADMIN_BY_ID_FAIL = 'GET_ADMIN_BY_ID_FAIL';
export const DELETE_ADMIN_SUCCESS = 'DELETE_ADMIN_SUCCESS';
export const DELETE_ADMIN_FAIL = 'DELETE_ADMIN_FAIL';
export const LOADING = 'LOADING';

const URL = 'https://limitless-citadel-83805.herokuapp.com';

export const fetchAllAdmins = () => {
    return async dispatch => {

        dispatch({
            type: LOADING
        });

        const result = await fetch(`${URL}/api/auth/admins`, {
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(jsonResponse => {
                if (!jsonResponse) {
                    dispatch({
                        type: GET_ADMINS_FAIL
                    });
                    return [];
                };
                return jsonResponse;
            })

        if (!result) {
            dispatch({
                type: GET_ADMINS_FAIL
            });
        } else {
            dispatch({
                type: GET_ADMINS_SUCCESS,
                payload: result
            });
        }
    };
};

export const fetchAdminById = (id) => {
    return async dispatch => {

        dispatch({
            type: LOADING
        });

        const result = await fetch(`${URL}/api/auth/admins/${id}`, {
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(jsonResponse => {
                if (!jsonResponse) {
                    dispatch({
                        type: GET_ADMIN_BY_ID_FAIL
                    });
                    return {};
                }
                return jsonResponse
            })

        if (!result) {
            dispatch({
                type: GET_ADMIN_BY_ID_FAIL
            });
        } else {
            dispatch({
                type: GET_ADMIN_BY_ID_SUCCESS,
                payload: result
            });
        }
    };
};

export const registerAdmin = data => {
    const { id, email, password } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${URL}/api/auth/create`, {
            method: 'POST',
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                email,
                password
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: REGISTER_ADMIN_SUCCESS,
                payload: 1
            });
        } else {
            dispatch({
                type: REGISTER_ADMIN_FAIL,
                payload: resultJson
            })
        }
        return resultJson;
    };
};

export const loginUser = data => {
    const { email, password } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: LOGIN_ADMIN_SUCCESS,
                payload: {
                    success: resultJson.success,
                    message: resultJson.message
                }
            })
        } else {
            dispatch({
                type: LOGIN_ADMIN_FAIL,
                payload: resultJson
            })
        }
        return resultJson;
    };
};

export const updatePassword = data => {
    const { id, password, newPassword } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${URL}/api/auth/update-password/${id}`, {
            method: 'PUT',
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                newPassword
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: UPDATE_PASSWORD_SUCCESS,
                payload: resultJson
            })
        } else {
            dispatch({
                type: UPDATE_PASSWORD_FAIL,
                payload: resultJson
            })
        }
        return resultJson;
    };
};

export const resetPassword = email => {

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${URL}/api/auth/reset-password/`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: resultJson
            })
        } else {
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: resultJson
            })
        }
        return resultJson;
    };
};

export const deleteAdmin = id => {

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${URL}/api/auth/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: DELETE_ADMIN_SUCCESS,
                payload: resultJson
            });
        } else {
            dispatch({
                type: DELETE_ADMIN_FAIL,
                payload: resultJson
            });
        }
        return resultJson;
    };
};