import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const EDIT_USER = 'session/editUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

const editUser = (user) => {
    return {
        type: EDIT_USER,
        payload: user,
    };
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

// export const signup = (user) => async (dispatch) => {
//     const { username, profileImage, firstName, lastName, email, password } = user;
//     console.log(user)
//     const response = await csrfFetch("/api/users", {
//         method: "POST",
//         body: JSON.stringify({
//             username,
//             profileImage,
//             firstName,
//             lastName,
//             email,
//             password,
//         }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
// };

export const signup = (user) => async (dispatch) => {
    const { username, profileImage, firstName, lastName, email, password } = user;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);

    if (profileImage) formData.append("profileImage", profileImage);


    const response = await csrfFetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

export const edit = (user) => async dispatch => {
    const { username, profileImage, firstName, lastName, email, password } = user;
    console.log(profileImage);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);

    if (profileImage) formData.append("profileImage", profileImage);

    const response = await csrfFetch(`/api/session/${user.id}`, {
        method: 'PATCH',
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify(user)
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    // if (response.ok) {
    const editedUser = await response.json();
    // console.log(editedUser);
    dispatch(editUser(editedUser));
    // }
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            // newState = Object.assign({}, state);
            // newState.user = action.payload;
            // return newState;
            return { ...state, user: action.payload };
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        case EDIT_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
