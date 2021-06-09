export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID';
export const FETCH_USER_BY_EMAIL = 'FETCH_USER_BY_EMAIL';

const URL = 'https://limitless-citadel-83805.herokuapp.com';

export const initialOptions = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
};


export const fetchAllUsers = () => {
    return async dispatch => {

        const result = await fetch(`${URL}/api/users`, initialOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(jsonResponse => {
                if (!jsonResponse) {
                    return [];
                }
                return jsonResponse;
            })

        dispatch({
            type: FETCH_ALL_USERS,
            payload: result[0]
        });
    };
};


export const fetchUserById = (id) => {
    return async dispatch => {

        const result = await fetch(`${URL}/api/users/${id}`, initialOptions)
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

        dispatch({
            type: FETCH_USER_BY_ID,
            payload: result
        });
    };
};


export const fetchUserByEmail = (email) => {
    return async dispatch => {

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

        dispatch({
            type: FETCH_USER_BY_EMAIL,
            payload: result[0]
        });
    };
};