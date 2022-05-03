// import { csrfFetch } from './csrf';

// const SET_NOTES = 'notes/setNotes';
// // const UPDATE_NOTEBOOK = 'notebook/updateNotebook';
// // const REMOVE_NOTBOOK = 'notebook/removeNotebook';

// const createNote = (note) => {
//     return {
//         type: SET_NOTES,
//         payload: note
//     };
// };
// export const getNotes = () => async (dispatch) => {
//     const response = await csrfFetch('/api/notebook');
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
// };
// // const updateNotebook = (title) => {
// //     return {
// //         type: UPDATE_NOTEBOOK,
// //         payload: title
// //     }
// // }
// // const removeNotebook = () => {
// //     return {
// //         type: REMOVE_NOTBOOK,
// //     };
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



// const notesReducer = (state = initialState, action) => {
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

// export default notesReducer;
