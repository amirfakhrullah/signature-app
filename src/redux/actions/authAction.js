export const REGISTER_ADMIN_SUCCESS = 'REGISTER_ADMIN_SUCCESS';
export const REGISTER_ADMIN_FAIL = 'REGISTER_ADMIN_FAIL';
export const LOGIN_ADMIN_SUCCESS = 'LOGIN_ADMIN_SUCCESS';
export const LOGIN_ADMIN_FAIL = 'LOGIN_ADMIN_FAIL';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL';
export const LOADING = 'LOADING';

const URL = 'https://limitless-citadel-83805.herokuapp.com';

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
        console.log(resultJson)

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