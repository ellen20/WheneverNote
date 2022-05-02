// import { csrfFetch } from './csrf';

// const SET_NOTEBOOK = 'notebook/setNotebook';
// const UPDATE_NOTEBOOK = 'notebook/updateNotebook';
// const REMOVE_NOTBOOK = 'notebook/removeNotebook';

// const createNotebook = (title) => {
//     return {
//         type: SET_NOTEBOOK,
//         payload: title
//     };
// };

// const updateNotebook = (title) => {
//     return {
//         type: UPDATE_NOTEBOOK,
//         payload: title
//     }
// }
// const removeNotebook = () => {
//     return {
//         type: REMOVE_NOTBOOK,
//     };
// };

// // export const create = (title) => async (dispatch) => {
// //     const { credential, password } = user;
// //     const response = await csrfFetch('/api/session', {
// //         method: 'POST',
// //         body: JSON.stringify({
// //             credential,
// //             password,
// //         }),
// //     });
// //     const data = await response.json();
// //     dispatch(setUser(data.user));
// //     return response;
// // };

// // export const signup = (user) => async (dispatch) => {
// //     const { username, email, password } = user;
// //     const response = await csrfFetch("/api/users", {
// //         method: "POST",
// //         body: JSON.stringify({
// //             username,
// //             email,
// //             password,
// //         }),
// //     });
// //     const data = await response.json();
// //     dispatch(setUser(data.user));
// //     return response;
// // };



// const notebookReducer = (state = initialState, action) => {
//     let newState;
//     switch (action.type) {
//         case SET_NOTEBOOK:
//             newState = Object.assign({}, state);
//             newState.user = action.payload;
//             return newState;
//         case REMOVE_USER:
//             newState = Object.assign({}, state);
//             newState.user = null;
//             return newState;
//         default:
//             return state;
//     }
// };

// export default notebookReducer;
