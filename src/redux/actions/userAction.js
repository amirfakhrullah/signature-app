export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID';
export const FETCH_USER_BY_EMAIL = 'FETCH_USER_BY_EMAIL';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const LOADING = 'LOADING';
export const FAIL = 'FAIL';

const URL = 'https://limitless-citadel-83805.herokuapp.com';

export const initialOptions = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
};


export const fetchAllUsers = () => {
    return async dispatch => {

        dispatch({
            type: LOADING
        });

        const result = await fetch(`${URL}/api/users`, {
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
                        type: FAIL
                    });
                    return [];
                };
                return jsonResponse;
            })

        if (!result) {
            dispatch({
                type: FAIL
            });
        } else {
            dispatch({
                type: FETCH_ALL_USERS,
                payload: result
            });
        }
    };
};


export const fetchUserById = (id) => {
    return async dispatch => {

        dispatch({
            type: LOADING
        });

        const result = await fetch(`${URL}/api/users/${id}`, initialOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(jsonResponse => {
                if (!jsonResponse) {
                    dispatch({
                        type: FAIL
                    });
                    return {};
                }
                return jsonResponse;
            })

        if (!result[0]) {
            dispatch({
                type: FAIL
            });
        } else {
            dispatch({
                type: FETCH_USER_BY_ID,
                payload: result[0]
            });
        }
    };
};


export const fetchUserByEmail = (email) => {
    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${URL}/api/users/email/${email}`, initialOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(jsonResponse => {
                if (!jsonResponse) {
                    return {};
                }
                return jsonResponse;
            })

        if (!result[0]) {
            dispatch({
                type: FAIL
            });
        } else {
            dispatch({
                type: FETCH_USER_BY_EMAIL,
                payload: result[0]
            });
        }
    };
};

export const createUser = (data) => {
    const { name, emailName, email, position, phone } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${URL}/api/users/`, {
            method: 'POST',
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                emailName,
                email,
                position,
                phone
            })

        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: CREATE_USER,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: resultJson
            });
        }
    };
};

export const updateUser = (data) => {
    const { id, name, emailName, email, position, phone } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${URL}/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                emailName,
                email,
                position,
                phone
            })

        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: UPDATE_USER,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: resultJson
            });
        }
    };
};

export const deleteUser = id => {

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${URL}/api/users/${id}`, {
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
                type: DELETE_USER,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: resultJson
            });
        }
    };
};