export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID';
export const FETCH_USER_BY_EMAIL = 'FETCH_USER_BY_EMAIL';
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

        const result = await fetch(`${URL}/api/users`, initialOptions)
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

        if (!result[0]) {
            dispatch({
                type: FAIL
            });
        } else {
            dispatch({
                type: FETCH_ALL_USERS,
                payload: result[0]
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